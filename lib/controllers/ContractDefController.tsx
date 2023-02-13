import IContractDefinition from '../domain/entities/IContractDefinition';
import ContractDefUseCases from '../useCases/ContractDefUseCases';

async function getContractDefs(): Promise<IContractDefinition[]> {
  return new ContractDefUseCases().list();
}

async function getActiveContractDefs(): Promise<IContractDefinition[]> {
  return new ContractDefUseCases().listActives();
}

async function getTableContractDefs(): Promise<
  TableMapping<IContractDefTable>
> {
  const contractDefs = await getContractDefs();

  const labelsMapping: IContractDefTable = {
    name: 'Name',
    description: 'Description',
    timeAmount: 'Time Amount',
    timeType: 'Time Type',
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

async function getFormFields(isNew = false): Promise<ModelKeys> {
  const forbbidenFields = isNew ? ['state'] : [];
  const keys = await new ContractDefUseCases().getKeys(forbbidenFields);
  const editables = keys.editables.map((fieldData) => {
    const { name } = fieldData;

    if (name === 'state' || name === 'timeType') {
      return {
        ...fieldData,
        type: 'state'
      };
    }

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
  getActiveContractDefs,
  getContractDefs,
  getTableContractDefs,
  getFormFields,
  createContractDef,
  getContractDef,
  updateContractDef,
  removeContractDef
};
