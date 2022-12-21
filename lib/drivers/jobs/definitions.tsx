import Agenda /* , { Job } */ from 'agenda';

const build = async (agenda: Agenda) => {
  agenda.define('DAILY_RECURRING_JOB', async (/* job: Job */) => {
    // const configUseCases = new ConfigUseCases();
    // console.log('hey there!!!!!');
  });
};

export default build;
