import IContractDefinition from '../domain/entities/IContractDefinition';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITask from '../domain/entities/ITask';
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
    timeType: string;
    termsConditions: string;
    state: string;
  };

  type ILeaseContractTable = {
    name: string;
    amount: string;
    description: string;
    startDate: string;
    nextDate: string;
    timeAmount: string;
    termsConditions: string;
    state: string;
  };

  type ITaskTable = {
    created_at: string;
    taskType: string;
    state: string;
    description: string;
  };

  type ITable =
    | IPropertyTable
    | ITenantTable
    | IContractDefTable
    | ILeaseContractTable
    | ITaskTable;

  type IEntity =
    | IProperty
    | ITenant
    | IContractDefinition
    | ILeaseContract
    | ITask; // add all entities with ORs as required

  type StepMapper = [IEntity, IEntity, IEntity];

  type TableMapping<TableName> = {
    tableName: TableName;
    arrayObj?: IEntity[];
  };

  type FieldData = {
    name: string;
    type: string;
    display_value: string;
    options?: string[] = [];
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
