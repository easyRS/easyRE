// TODO: think about implement this

import ITenant from '../domain/entities/ITenant';
import TenantUseCases from '../useCases/TenantUseCases';

async function getTenants(): Promise<ITenant[]> {
  return new TenantUseCases().list();
}

async function getTableTenants(): Promise<TableMapping<ITenantTable>> {
  const tenants = await getTenants();

  const labelsMapping: ITenantTable = {
    name: 'Name',
    phone: 'Phone',
    notes: 'Notes'
  };

  return {
    tableName: labelsMapping,
    arrayObj: tenants
  };
}

async function getTenant(_id: string): Promise<ITenant> {
  return new TenantUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new TenantUseCases().getKeys();
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

async function createTenant(object: Record<string, unknown>) {
  return new TenantUseCases().create(object);
}

async function updateTenant(object: Record<string, unknown>) {
  return new TenantUseCases().update(object);
}

async function removeTenant(object: Record<string, unknown>) {
  return new TenantUseCases().remove(object);
}

export {
  getTenants,
  getTableTenants,
  getFormFields,
  createTenant,
  getTenant,
  updateTenant,
  removeTenant
};
