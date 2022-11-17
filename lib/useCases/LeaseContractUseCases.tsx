import ILeaseContract from '../domain/entities/ILeaseContract';
import LeaseContractRepository from '../domain/repositories/LeaseContractRepository';
import AbstractUseCases from './AbstractUseCases';

import PropertyUseCases from './PropertyUseCases';
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
      timeAmount: object.timeAmount as string,
      termsConditions: object.termsConditions as string,
      state: object.state as string,
      property: object.property as Record<string, unknown>,
      tenant: object.tenant as Record<string, unknown>
    };
  }

  async create(unknownObj: Record<string, unknown>): Promise<ILeaseContract> {
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
      ...objValues[2]
    };

    /*
    Atomic transaction
    Tenant and Propery => create or update
    Lease contract copy values from contratDef of objvalues (evaluate fields to add/modify/delete)
    Launch jobs 
    */
    return super.create(leaseContract);
  }
}
