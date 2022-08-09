import React from 'react';
import IProperty from '../domain/entities/IProperty';

export {};

declare global {
  type Menu = {
    key: string;
    name: string;
    link: string;
  };

  type BurguerMenuProps = {
    menus: Menu[];
    content: React.ReactNode;
    isOpen?: boolean;
  };

  type IPropertyTable = {
    name: string;
    measure: string;
    location_details: string;
  };

  type IEntity = IProperty; // add all entities with ORs as required

  type TableMapping<TableName> = {
    tableName: TableName;
    arrayObj: IEntity[];
  };
}
