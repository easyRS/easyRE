import IContractDefinition from '../domain/entities/IContractDefinition';
import ContractDefRepository from '../domain/repositories/ContractDefRepository';
import AbstractUseCases from './AbstractUseCases';

export default class ContractDefUseCases extends AbstractUseCases<
  IContractDefinition,
  ContractDefRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): ContractDefRepository {
    return new ContractDefRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IContractDefinition {
    return {
      name: object.name as string,
      description: object.description as string,
      timeAmount: object.timeAmount as string,
      amount: object.amount as number,
      termsConditions: object.termsConditions as string,
      state: object.state as string
    };
  }
}
