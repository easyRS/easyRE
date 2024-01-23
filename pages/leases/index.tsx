import type { NextPage } from 'next';
import { Table, TopNavigation } from '../../lib/components';
import { getAllLeaseContracts } from '../../lib/controllers/LeaseContractController';

type IndexLeaseContractProps = {
  tableLeaseContracts: TableMapping<ILeaseContractTable>;
};

const LeaseContractIndex: NextPage<IndexLeaseContractProps> = (
  contractDefProps: IndexLeaseContractProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <Table
            tableProperties={contractDefProps.tableLeaseContracts}
            newRedirectUrl="main"
            editRedirectUrl="leases/"
            newTitle="New Lease Contract"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const tableLeaseContracts = await getAllLeaseContracts();

  return {
    props: { tableLeaseContracts }
  };
}

export default LeaseContractIndex;
