import IContractDefinition, {
  CONTRACT_ACTIVE_STATE,
  CONTRACT_DEFINTION_STATES
} from '../entities/IContractDefinition';

import {
  TIME_TYPE_DAILY_OPTION,
  TIME_TYPE_MONTHLY_OPTION
} from '../entities/TimeType';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class ContractDefRepository extends MongooseAbstractRepository<IContractDefinition> {
  constructor() {
    super('ContractDefinition', 'CSchema');
  }

  /* eslint-disable-line class-methods-use-this */ getActiveState(): string {
    return CONTRACT_ACTIVE_STATE;
  }

  /* eslint-disable-line class-methods-use-this */ getAllStates(): string[] {
    return CONTRACT_DEFINTION_STATES;
  }

  /* eslint-disable-line class-methods-use-this */ getDailyOption(): string {
    return TIME_TYPE_DAILY_OPTION;
  }

  /* eslint-disable-line class-methods-use-this */ getMonthlyOption(): string {
    return TIME_TYPE_MONTHLY_OPTION;
  }

  async listActives(): Promise<IContractDefinition[]> {
    const activeState = this.getActiveState();
    const query = { state: activeState };
    return super.list([], query);
  }
}
