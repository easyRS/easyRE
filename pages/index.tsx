import type { NextPage } from 'next';
import { Table, TopNavigation } from '../lib/components';
import { getCurrentTableTasks } from '../lib/controllers/TaskController';

type IndexTaskProps = {
  tableTasks: TableMapping<ITaskTable>;
};

const Home: NextPage<IndexTaskProps> = (tasksProps: IndexTaskProps) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <Table
            tableProperties={tasksProps.tableTasks}
            newRedirectUrl="tasks/new"
            editRedirectUrl="tasks/"
            newTitle="Create New Task"
            headerTitle="Last two week tasks"
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const tableTasks = await getCurrentTableTasks();

  return {
    props: { tableTasks }
  };
}

export default Home;
