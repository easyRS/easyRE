import mongoose, { Types } from 'mongoose';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITenant from '../domain/entities/ITenant';
import LeaseContractRepository from '../domain/repositories/LeaseContractRepository';
import AbstractUseCases from './AbstractUseCases';

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
      timeAmount: object.timeAmount as string,
      termsConditions: object.termsConditions as string,
      state: object.state as string,
      amount: object.amount as number,
      property: (object.property as IProperty)._id || new Types.ObjectId(),
      tenant: (object.tenant as ITenant)._id || new Types.ObjectId()
    };
  }

  async create(unknownObj: Record<string, unknown>): Promise<ILeaseContract> {
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

      const leaseContract = {
        property,
        tenant,
        ...objValues[2],
        state: 'activado' // TODO: work with states later
      };
      const lease = await super.create(leaseContract);
      await this.generateMonthlyRecurringTasks(lease);
      return lease;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }

  async /* eslint-disable-line class-methods-use-this */ generateMonthlyRecurringTasks(
    leaseContract: ILeaseContract
  ): Promise<void> {
    const { startDate, nextDate } = leaseContract;

    const taskUseCases = new TaskUseCases();
    const tenantUseCases = new TenantUseCases();

    const now = new Date();
    const startingDate = new Date(nextDate || startDate);
    const tenant = await tenantUseCases.findById(
      leaseContract.tenant.toString()
    );
    if (now >= startingDate) {
      await taskUseCases._createLeaseTask(leaseContract, tenant);
      await taskUseCases._createElectricityTask(leaseContract, tenant);
      await taskUseCases._createGasTask(leaseContract, tenant);
      await taskUseCases._createWaterTask(leaseContract, tenant);
    }
  }
}
