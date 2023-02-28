import IProperty from '../domain/entities/IProperty';
import PropertyUseCases from '../useCases/PropertyUseCases';

async function getProperties(): Promise<IProperty[]> {
  return new PropertyUseCases().list();
}

async function getTableProperties(): Promise<TableMapping<IPropertyTable>> {
  const properties = await getProperties();

  const labelsMapping: IPropertyTable = {
    name: 'Name',
    measure: 'Measure',
    amount: 'Amount',
    location_details: 'Location Details',
    coordinates: 'Coordinates'
  };

  return {
    tableName: labelsMapping,
    arrayObj: properties
  };
}

async function getProperty(_id: string): Promise<IProperty> {
  return new PropertyUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new PropertyUseCases().getKeys();
  const editables = keys.editables.map((fieldData) => {
    if (fieldData.name === 'coordinates') {
      return {
        ...fieldData,
        type: 'coordinates'
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

async function createProperty(object: Record<string, unknown>) {
  return new PropertyUseCases().create(object);
}

async function updateProperty(object: Record<string, unknown>) {
  return new PropertyUseCases().update(object);
}

async function removeProperty(object: Record<string, unknown>) {
  return new PropertyUseCases().remove(object);
}

async function allOccupancyRate() {
  return new PropertyUseCases().allOccupancyRate();
}

export {
  getProperties,
  getTableProperties,
  getFormFields,
  createProperty,
  getProperty,
  updateProperty,
  removeProperty,
  allOccupancyRate
};
