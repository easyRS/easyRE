import mongoose, { Types } from 'mongoose';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITenant from '../domain/entities/ITenant';
import LeaseContractRepository from '../domain/repositories/LeaseContractRepository';
import AbstractUseCases from './AbstractUseCases';

import { generateGoogleUrlRedirect } from '../drivers/network/googleapis';
import { daysBetween, monthsBetween } from '../utils/datesHelper';
import EventUseCases from './EventUseCases';
import PropertyUseCases from './PropertyUseCases';
import TaskUseCases from './TaskUseCases';
import TenantUseCases from './TenantUseCases';

export default class LeaseContractUseCases extends AbstractUseCases<
  ILeaseContract,
  LeaseContractRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): LeaseContractRepository {
    return new LeaseContractRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ILeaseContract {
    return {
      name: object.name as string,
      description: object.description as string,
      startDate: object.startDate as string,
      nextDate: object.nextDate as string,
      timeAmount: object.timeAmount as string,
      timeType: object.timeType as string,
      termsConditions: object.termsConditions as string,
      state: object.state as string,
      amount: object.amount as number,
      property: (object.property as IProperty)._id || new Types.ObjectId(),
      tenant: (object.tenant as ITenant)._id || new Types.ObjectId()
    };
  }

  async listWorkInProgress(): Promise<ILeaseContract[]> {
    return (this.repository as LeaseContractRepository).listWorkInProgress();
  }

  async activeContracts(): Promise<number> {
    const wip = await (
      this.repository as LeaseContractRepository
    ).listWorkInProgress();
    return wip.length;
  }

  async create(unknownObj: Record<string, unknown>): Promise<NewLeaseContract> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const object = unknownObj as unknown;
      const objValues = object as StepMapper;

      let tenant = objValues[0];
      const tenantUseCase = new TenantUseCases();
      if (tenant._id)
        await tenantUseCase.update(unknownObj[0] as Record<string, unknown>);
      else
        tenant = await tenantUseCase.create(
          unknownObj[0] as Record<string, unknown>
        );

      let property = objValues[1];
      const propertyUseCase = new PropertyUseCases();
      if (property._id)
        await propertyUseCase.update(unknownObj[1] as Record<string, unknown>);
      else
        property = await propertyUseCase.create(
          unknownObj[1] as Record<string, unknown>
        );

      const workInProgressState = (
        this.repository as LeaseContractRepository
      ).getWorkInProgressState();
      const leaseContract = {
        property,
        tenant,
        ...objValues[2],
        state: workInProgressState
      };

      const leaseTmp = await super.create(leaseContract);
      if (leaseTmp._id) {
        let lease = await this.findById(leaseTmp._id.toString(), []);
        const generateEvents = false;
        lease = await this.generateMonthlyRecurringTasks(lease, generateEvents);

        const url = await this.generateUrlRedirect(lease);
        const urlObj = { url };
        return { ...lease, ...urlObj };
      }

      throw new Error('Lease not found');
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  async calculateNextDate(
    leaseContract: ILeaseContract
  ): Promise<ILeaseContract> {
    const { timeType, startDate, nextDate, timeAmount } = leaseContract;

    const startingDate = new Date(nextDate || startDate);

    const newDate = new Date(startingDate);
    const unknownRepository = this.repository as unknown;

    const dailyOption = (
      unknownRepository as LeaseContractRepository
    ).getDailyOption();
    const monthlyOption = (
      unknownRepository as LeaseContractRepository
    ).getMonthlyOption();

    if (timeType === dailyOption) {
      newDate.setDate(startingDate.getDate() + 1);
    } else if (timeType === monthlyOption) {
      newDate.setMonth(startingDate.getMonth() + 1);
    }

    const finalDate = newDate.toLocaleString();

    const currentTime =
      timeType === monthlyOption
        ? monthsBetween(new Date(startDate), startingDate || undefined)
        : daysBetween(new Date(startDate), startingDate || undefined);

    const count = parseInt(timeAmount, 10) - 1;
    if (currentTime === count) {
      const closeCompletedState = (
        unknownRepository as LeaseContractRepository
      ).getCloseCompletedState();
      return this.update({
        ...leaseContract,
        _id: leaseContract._id?.toString(),
        nextDate: finalDate,
        state: closeCompletedState
      });
    }
    return this.update({
      ...leaseContract,
      _id: leaseContract._id?.toString(),
      nextDate: finalDate
    });
  }

  /* eslint-disable-line*/ async generateUrlRedirect(
    leaseContract: ILeaseContract
  ): Promise<string> {
    if (leaseContract._id) {
      return generateGoogleUrlRedirect(leaseContract._id.toString());
    }
    return '';
  }

  async generateMonthlyRecurringTasks(
    leaseContract: ILeaseContract,
    generateEvents: boolean
  ): Promise<ILeaseContract> {
    const { startDate, nextDate, amount } = leaseContract;

    const taskUseCases = new TaskUseCases();
    const tenantUseCases = new TenantUseCases();

    const now = new Date();

    const startingDate = new Date(nextDate || startDate);
    if (leaseContract.tenant && leaseContract.tenant._id) {
      const tenant = await tenantUseCases.findById(
        leaseContract.tenant._id.toString()
      );

      if (now >= startingDate) {
        const leaseTask = await taskUseCases._createLeaseTask(
          leaseContract,
          tenant,
          amount
        );
        if (generateEvents && leaseTask._id && leaseContract._id) {
          await new EventUseCases().create({
            task: leaseTask._id,
            leaseContract: leaseContract._id
          });
        }
        await taskUseCases._createElectricityTask(leaseContract, tenant);
        await taskUseCases._createGasTask(leaseContract, tenant);
        await taskUseCases._createWaterTask(leaseContract, tenant);

        return this.calculateNextDate(leaseContract);
      }
    }

    return leaseContract;
  }
}
