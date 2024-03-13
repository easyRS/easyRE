import ITransactionType from '../domain/entities/ITransactionType';
import TransactionTypeRepository from '../domain/repositories/TransactionTypeRepository';
import AbstractUseCases from './AbstractUseCases';

export default class TransactionTypeUseCases extends AbstractUseCases<
  ITransactionType,
  TransactionTypeRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): TransactionTypeRepository {
    return new TransactionTypeRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ITransactionType {
    return {
      name: object.name as string
    };
  }
}
