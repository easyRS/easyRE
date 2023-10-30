import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getGoogleUrl,
  getTask
} from '../../lib/controllers/TaskController';

import ITask from '../../lib/domain/entities/ITask';
import callbacks from '../../lib/drivers/network/tasks';

type EditTaskProps = {
  formFields: ModelKeys;
  task: ITask;
  urlEvent: string;
};

const EditTasks: NextPage<EditTaskProps> = (tasksProps: EditTaskProps) => {
  const { urlEvent } = tasksProps;
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <Form
            formFields={tasksProps.formFields}
            successRedirect="/"
            editObj={tasksProps.task}
            callbacks={callbacks}
            canDelete
          />
          {urlEvent && (
            <div
              style={{
                padding: '1rem 2rem',
                maxWidth: '500px',
                margin: '10px auto',
                background: 'white',
                textAlign: 'left',
                borderRadius: '1rem',
                boxShadow: '0 0 3px var(--cadet-gray)'
              }}
            >
              <Link href={urlEvent}>Generate Event</Link>
            </div>
          )}
        </div>
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.query;
  const formFields = await getFormFields();
  const task = await getTask(_id as string);
  const urlEvent = await getGoogleUrl(_id as string);
  return {
    props: { formFields, task, urlEvent }
  };
};

export default EditTasks;
