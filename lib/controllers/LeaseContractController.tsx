// TODO: think about implement this

import ILeaseContract from '../domain/entities/ILeaseContract';
import LeaseContractUseCases from '../useCases/LeaseContractUseCases';

async function createLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().create(object);
}

async function getLeaseContracts(): Promise<ILeaseContract[]> {
  return new LeaseContractUseCases().list();
}

async function getTableLeaseContracts(): Promise<
  TableMapping<ILeaseContractTable>
> {
  const leaseContracts = await getLeaseContracts();

  const labelsMapping: ILeaseContractTable = {
    name: 'Name',
    description: 'Description',
    timeAmount: 'Time Amount',
    state: 'State',
    termsConditions: 'Terms & Conditions'
  };

  return {
    tableName: labelsMapping,
    arrayObj: leaseContracts
  };
}

async function getLeaseContract(_id: string): Promise<ILeaseContract> {
  return new LeaseContractUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new LeaseContractUseCases().getKeys();
  const editables = keys.editables.map((fieldData) => {
    return {
      ...fieldData,
      type: 'text'
    };
  });

  return {
    ...keys,
    editables
  };
}

async function updateLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().update(object);
}

async function removeLeaseContract(object: Record<string, unknown>) {
  return new LeaseContractUseCases().remove(object);
}

export {
  createLeaseContract,
  getLeaseContracts,
  getTableLeaseContracts,
  getFormFields,
  getLeaseContract,
  updateLeaseContract,
  removeLeaseContract
};
