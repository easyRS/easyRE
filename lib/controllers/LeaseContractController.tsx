import ILeaseContract from '../domain/entities/ILeaseContract';
import LeaseContractUseCases from '../useCases/LeaseContractUseCases';

async function createLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().create(object);
}

async function getLeaseContracts(): Promise<ILeaseContract[]> {
  return new LeaseContractUseCases().list();
}

async function getTableLeaseContracts(
  leaseContracts: ILeaseContract[]
): Promise<TableMapping<ILeaseContractTable>> {
  const labelsMapping: ILeaseContractTable = {
    name: 'Name',
    amount: 'Amount',
    description: 'Description',
    startDate: 'Start Date',
    nextDate: 'Next Date',
    timeAmount: 'Time Amount',
    state: 'State',
    termsConditions: 'Terms & Conditions'
  };

  return {
    tableName: labelsMapping,
    arrayObj: leaseContracts
  };
}

async function getActiveLeaseContracts(): Promise<
  TableMapping<ILeaseContractTable>
> {
  const leaseContractUseCase = new LeaseContractUseCases();
  const leaseContracts = await leaseContractUseCase.listWorkInProgress();

  return getTableLeaseContracts(leaseContracts);
}

async function getAllLeaseContracts(): Promise<
  TableMapping<ILeaseContractTable>
> {
  const leaseContractUseCase = new LeaseContractUseCases();
  const leaseContracts = await leaseContractUseCase.list();

  return getTableLeaseContracts(leaseContracts);
}

async function getLeaseContract(_id: string): Promise<ILeaseContract> {
  return new LeaseContractUseCases().findById(_id);
}

async function getFormFields(isNew = false): Promise<ModelKeys> {
  const forbbidenFields = isNew
    ? ['state', 'property', 'tenant']
    : ['property', 'tenant'];
  const keys = await new LeaseContractUseCases().getKeys(forbbidenFields);
  const editablesUnfiltered = keys.editables.map((fieldData) => {
    const { name } = fieldData;

    if (name === 'timeType') {
      return {
        ...fieldData,
        type: 'state'
      };
    }

    if (name === 'startDate') {
      return {
        ...fieldData,
        type: 'date'
      };
    }

    const multilineTexts = ['termsConditions', 'description'];
    if (multilineTexts.includes(name)) {
      return {
        ...fieldData,
        type: 'multiline'
      };
    }

    const numbers = ['timeAmount', 'amount'];
    if (numbers.includes(name)) {
      return {
        ...fieldData,
        type: 'number'
      };
    }

    return {
      ...fieldData,
      type: 'text'
    };
  });
  const all = keys.all.filter((key) => key !== 'nextDate');
  const editables = editablesUnfiltered.filter(
    (obj) => obj.name !== 'nextDate'
  );

  return {
    ...keys,
    all,
    editables
  };
}

async function updateLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().update(object);
}

async function removeLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().remove(object);
}

async function activeContracts() {
  return new LeaseContractUseCases().activeContracts();
}

export {
  createLeaseContract,
  getLeaseContracts,
  getAllLeaseContracts,
  getActiveLeaseContracts,
  getFormFields,
  getLeaseContract,
  updateLeaseContract,
  removeLeaseContract,
  activeContracts
};
