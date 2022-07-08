export {};

declare global {
  type Menu = {
    key: string;
    name: string;
  };

  type BurguerMenuProps = {
    menus: Menu[];
    isOpen?: boolean;
  };
}
