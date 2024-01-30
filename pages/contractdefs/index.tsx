import type { NextPage } from 'next';
import { Table, TopNavigation } from '../../lib/components';
import { getTableContractDefs } from '../../lib/controllers/ContractDefController';
import styles from './index.module.css';

type IndexContractDefProps = {
  tableContractDefs: TableMapping<IContractDefTable>;
};

const ContractDefIndex: NextPage<IndexContractDefProps> = (
  contractDefProps: IndexContractDefProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div className={styles.container}>
          <Table
            tableProperties={contractDefProps.tableContractDefs}
            newRedirectUrl="contractdefs/new"
            editRedirectUrl="contractdefs/"
            newTitle="New Contract Definition"
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
