import IContractDefinition from '../domain/entities/IContractDefinition';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITenant from '../domain/entities/ITenant';

export {};

declare global {
  type Menu = {
    key: string;
    name: string;
    link: string;
  };

  type IPropertyTable = {
    name: string;
    measure: string;
    amount: string;
    coordinates: string;
    location_details: string;
  };

  type ITenantTable = {
    name: string;
    phone: string;
    notes: string;
  };

  type IContractDefTable = {
    name: string;
    description: string;
    timeAmount: string;
    termsConditions: string;
    state: string;
  };

  type ILeaseContractTable = {
    name: string;
    description: string;
    timeAmount: string;
    termsConditions: string;
    state: string;
  };

  type ITable =
    | IPropertyTable
    | ITenantTable
    | IContractDefTable
    | ILeaseContractTable;

  type IEntity = IProperty | ITenant | IContractDefinition | ILeaseContract; // add all entities with ORs as required

  type StepMapper = [IEntity, IEntity, IEntity];

  type TableMapping<TableName> = {
    tableName: TableName;
    arrayObj?: IEntity[];
  };

  type FieldData = {
    name: string;
    type: string;
    display_value: string;
  };

  type ModelKeys = {
    all: string[];
    editables: FieldData[];
  };

  type Coordinates = {
    latitude: number;
    longitude: number;
  };

  type CallApiObject = {
    endpoint: string;
    method: string;
    data: AllowedType;
  };
}
