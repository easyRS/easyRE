import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import { getFormFields, getTask } from '../../lib/controllers/TaskController';

import ITask from '../../lib/domain/entities/ITask';
import callbacks from '../../lib/drivers/network/tasks';

type EditTaskProps = {
  formFields: ModelKeys;
  task: ITask;
};

const EditTasks: NextPage<EditTaskProps> = (tasksProps: EditTaskProps) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={tasksProps.formFields}
          successRedirect="/"
          editObj={tasksProps.task}
          callbacks={callbacks}
          canDelete
        />
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.query;
  const formFields = await getFormFields();
  const task = await getTask(_id as string);
  return {
    props: { formFields, task }
  };
};

export default EditTasks;
