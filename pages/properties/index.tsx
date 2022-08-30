import type { NextPage } from 'next';
import { BurgerMenu, Table } from '../../lib/components';
import { getTableProperties } from '../../lib/controllers/PropertyController';

type IndexPropertyProps = {
  tableProperties: TableMapping<IPropertyTable>;
};

const PropertyIndex: NextPage<IndexPropertyProps> = (
  propertiesProps: IndexPropertyProps
) => {
  return (
    <BurgerMenu
      content={
        <div>
          <Table tableProperties={propertiesProps.tableProperties} />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const tableProperties = await getTableProperties();

  return {
    props: { tableProperties }
  };
}

export default PropertyIndex;
