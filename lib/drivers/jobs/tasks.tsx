import start from './agenda';
// import ConfigUseCases from '../../useCases/ConfigUseCases';

const startDailyJob = async () => {
  // const configUseCases = new ConfigUseCases();
  // docker exec main yarn run job
  const agenda = await start();
  agenda.now('DAILY_RECURRING_JOB', {});
  // agenda.create('DAILY_RECURRING_JOB', {}).schedule('in 1 minutes').save();
};

export default startDailyJob;
