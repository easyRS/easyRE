import type { NextPage } from 'next';

import { useEffect } from 'react';
import { FaPaperPlane, FaRegLightbulb, FaTasks } from 'react-icons/fa';
import { Counter, Table, TopNavigation } from '../lib/components';
import {
  listAllCompleted,
  listAllWorkInProgress,
  shouldCreateEvents
} from '../lib/controllers/TaskController';

import { activeContracts } from '../lib/controllers/LeaseContractController';
import { allOccupancyRate } from '../lib/controllers/PropertyController';
import styles from './index.module.css';

type IndexTaskProps = {
  currentTableTasks: TableMapping<ITaskTable>;
  finishedTableTasks: TableMapping<ITaskTable>;
  occupancyRate: number;
  nroContracts: number;
  createEvents: string;
  authenticated: boolean;
};

const Home: NextPage<IndexTaskProps> = (tasksProps: IndexTaskProps) => {
  const { createEvents } = tasksProps;
  useEffect(() => {
    if (createEvents)
      /* eslint-disable-line*/ window.open(createEvents, '_blank');
  }, [createEvents]);

  return (
    <TopNavigation
      isOpen={false}
      content={
        <div className={styles.mainContainer}>
          <div className={styles.messageContainer}>
            <p className={styles.welcomeText}>
              Welcome to <strong>Easy RS</strong>!. The easy open-source way to
              manage your Real State 🏠 stuff
              <br /> <FaRegLightbulb />
              &nbsp; Start creating a lease for managing your properties. Press
              the button top-right upper &nbsp;
              <FaPaperPlane />
              <br />
              <FaTasks />
              &nbsp; Then, you can review pending tasks below & useful reports.
            </p>
          </div>
          <div className={styles.reportContainer}>
            <div style={{ marginBottom: '12px' }}>
              <Counter
                value={`There're currently ${tasksProps.nroContracts} active contracts`}
                title="Active Contracts"
              />
            </div>

            <Counter
              value={`Property occupancy of ${tasksProps.occupancyRate || 0}%.`}
              title="Occupancy"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <Table
              tableProperties={tasksProps.currentTableTasks}
              newRedirectUrl="tasks/new"
              editRedirectUrl="tasks/"
              newTitle="New Task"
              headerTitle="Active tasks"
              buttonType="secondary"
              enableFilter
              defaultFilterValue="2"
            />
          </div>

          <Table
            tableProperties={tasksProps.finishedTableTasks}
            newRedirectUrl="tasks/new"
            editRedirectUrl="tasks/"
            headerTitle="Completed tasks"
            buttonType="secondary"
            enableFilter
            defaultFilterValue="1"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const currentTableTasks = await listAllWorkInProgress();
  const finishedTableTasks = await listAllCompleted();
  const occupancyRateRaw = await allOccupancyRate();
  const occupancyRate = Math.round(occupancyRateRaw * 100) / 100;
  const nroContracts = await activeContracts();
  const createEvents = await shouldCreateEvents();

  return {
    props: {
      currentTableTasks,
      finishedTableTasks,
      occupancyRate,
      nroContracts,
      createEvents
    }
  };
}

export default Home;
