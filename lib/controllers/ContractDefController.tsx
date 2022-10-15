import IContractDefinition from '../domain/entities/IContractDefinition';
import ContractDefUseCases from '../useCases/ContractDefUseCases';

async function getContractDefs(): Promise<IContractDefinition[]> {
  return new ContractDefUseCases().list();
}

async function getTableContractDefs(): Promise<
  TableMapping<IContractDefTable>
> {
  const contractDefs = await getContractDefs();

  const labelsMapping: IContractDefTable = {
    name: 'Name',
    description: 'Description',
    timeAmount: 'Time Amount',
    state: 'State',
    termsConditions: 'Terms & Conditions'
  };

  return {
    tableName: labelsMapping,
    arrayObj: contractDefs
  };
}

async function getContractDef(_id: string): Promise<IContractDefinition> {
  return new ContractDefUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new ContractDefUseCases().getKeys();
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

async function createContractDef(object: Record<string, unknown>) {
  return new ContractDefUseCases().create(object);
}

async function updateContractDef(object: Record<string, unknown>) {
  return new ContractDefUseCases().update(object);
}

async function removeContractDef(object: Record<string, unknown>) {
  return new ContractDefUseCases().remove(object);
}

export {
  getContractDefs,
  getTableContractDefs,
  getFormFields,
  createContractDef,
  getContractDef,
  updateContractDef,
  removeContractDef
};
