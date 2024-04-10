import ITransaction from '../domain/entities/ITransaction';
import TransactionRepository from '../domain/repositories/TransactionRepository';
import AbstractUseCases from './AbstractUseCases';

export default class TransactionUseCases extends AbstractUseCases<
  ITransaction,
  TransactionRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): TransactionRepository {
    return new TransactionRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ITransaction {
    return {
      created_at: object.created_at as string,
      amount: object.amount as number,
      notes: object.notes as string,
      task: object.task as SYS_ID,
      transactionType: object.transactionType as SYS_ID
    };
  }
}
