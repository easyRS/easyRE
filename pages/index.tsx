import type { NextPage } from 'next';
import { Counter, Table, TopNavigation } from '../lib/components';
import {
  getBeforeTwoTableTasks,
  getCurrentTableTasks
} from '../lib/controllers/TaskController';

import { activeContracts } from '../lib/controllers/LeaseContractController';
import { allOccupancyRate } from '../lib/controllers/PropertyController';

type IndexTaskProps = {
  currentTableTasks: TableMapping<ITaskTable>;
  outdateTableTasks: TableMapping<ITaskTable>;
  occupancyRate: number;
  nroContracts: number;
};

const Home: NextPage<IndexTaskProps> = (tasksProps: IndexTaskProps) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <Table
            tableProperties={tasksProps.currentTableTasks}
            newRedirectUrl="tasks/new"
            editRedirectUrl="tasks/"
            newTitle="Create New Task"
            headerTitle="Last two week tasks"
          />
          <div
            style={{
              margin: '1rem 0 1rem 0',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <Counter
              value={`${tasksProps.nroContracts}`}
              title="Active Contracts"
            />
            <Counter
              value={`${tasksProps.occupancyRate || 0}%`}
              title="Occupancy"
            />
          </div>

          <Table
            tableProperties={tasksProps.outdateTableTasks}
            newRedirectUrl="tasks/new"
            editRedirectUrl="tasks/"
            headerTitle="Outdate two week tasks"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const currentTableTasks = await getCurrentTableTasks();
  const outdateTableTasks = await getBeforeTwoTableTasks();
  const occupancyRateRaw = await allOccupancyRate();
  const occupancyRate = Math.round(occupancyRateRaw * 100) / 100;
  const nroContracts = await activeContracts();

  return {
    props: { currentTableTasks, outdateTableTasks, occupancyRate, nroContracts }
  };
}

export default Home;
