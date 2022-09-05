import React from 'react';
import IContractDefinition from '../domain/entities/IContractDefinition';
import IProperty from '../domain/entities/IProperty';
import ITenant from '../domain/entities/ITenant';

export {};

declare global {
  type Menu = {
    key: string;
    name: string;
    link: string;
  };

  type BurguerMenuProps = {
    menus?: Menu[];
    content: React.ReactNode;
    isOpen?: boolean;
  };

  type IPropertyTable = {
    name: string;
    measure: string;
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
    amount: string;
    termsConditions: string;
    state: string;
  };

  type ITable = IPropertyTable | ITenantTable | IContractDefTable;

  type IEntity = IProperty | ITenant | IContractDefinition; // add all entities with ORs as required

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
    data: Record<string, unknown>;
  };
}
