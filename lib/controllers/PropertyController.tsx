// TODO: think about implement this

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
    location_details: 'Location Details'
  };

  return {
    tableName: labelsMapping,
    arrayObj: properties
  };
}

export { getProperties, getTableProperties };
