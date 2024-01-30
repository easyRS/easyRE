import type { NextPage } from 'next';
import { Table, TopNavigation } from '../../lib/components';
import { getTableProperties } from '../../lib/controllers/PropertyController';
import styles from './index.module.css';

type IndexPropertyProps = {
  tableProperties: TableMapping<IPropertyTable>;
};

const PropertyIndex: NextPage<IndexPropertyProps> = (
  propertiesProps: IndexPropertyProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div className={styles.proContainer}>
          <Table
            tableProperties={propertiesProps.tableProperties}
            newRedirectUrl="properties/new"
            editRedirectUrl="properties/"
            newTitle="New Property"
          />
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
