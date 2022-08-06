import React from 'react';

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

  type TableMapping = {
    tableName: Record<string, unknown>;
    arrayObj: Record<string, unknown>[];
  };
}
