import type { NextPage } from 'next';
import { FaPaperPlane, FaRegLightbulb, FaTasks } from 'react-icons/fa';
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
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.8rem',
              boxShadow: '0 0 3px var(--cadet-gray)',
              textAlign: 'left',
              padding: '0.2rem 1rem',
              marginBottom: '1.2rem'
            }}
          >
            <p
              style={{
                textAlign: 'start',
                lineHeight: '2rem'
              }}
            >
              Welcome to <strong>Easy RS</strong>!.
              <br /> <FaRegLightbulb />
              &nbsp; Start creating a lease for managing your properties. Press
              the button top-right upper &nbsp;
              <FaPaperPlane />
              <br />
              <FaTasks />
              &nbsp; Then, you can review pending tasks below & useful reports.
            </p>
          </div>
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
              value={`There're currently ${tasksProps.nroContracts} active contracts`}
              title="Active Contracts"
            />
            <Counter
              value={`Property occupancy of ${tasksProps.occupancyRate || 0}%.`}
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
