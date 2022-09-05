import type { NextPage } from 'next';
import { BurgerMenu, Table } from '../../lib/components';
import { getTableContractDefs } from '../../lib/controllers/ContractDefController';

type IndexContractDefProps = {
  tableContractDefs: TableMapping<IContractDefTable>;
};

const ContractDefIndex: NextPage<IndexContractDefProps> = (
  contractDefProps: IndexContractDefProps
) => {
  return (
    <BurgerMenu
      content={
        <div>
          <Table
            tableProperties={contractDefProps.tableContractDefs}
            newRedirectUrl="contractdefs/new"
            editRedirectUrl="contractdefs/"
            newTitle="Create New Contract Definitions"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const tableContractDefs = await getTableContractDefs();

  return {
    props: { tableContractDefs }
  };
}

export default ContractDefIndex;
