import type { NextPage } from 'next';
import { Table, TopNavigation } from '../../lib/components';
import { getTableTenants } from '../../lib/controllers/TenantController';

type IndexTenantProps = {
  tableTenants: TableMapping<ITenantTable>;
};

const TenantIndex: NextPage<IndexTenantProps> = (
  tenantsProps: IndexTenantProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div style={{ minWidth: '1000px' }}>
          <Table
            tableProperties={tenantsProps.tableTenants}
            newRedirectUrl="tenants/new"
            editRedirectUrl="tenants/"
            newTitle="New Tenant"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const tableTenants = await getTableTenants();

  return {
    props: { tableTenants }
  };
}

export default TenantIndex;
