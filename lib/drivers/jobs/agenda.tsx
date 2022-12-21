import Agenda from 'agenda';
import build from './definitions';

const { DATABASE_URL } = process.env;

const mongoConnectionString = DATABASE_URL as string;
const agenda = new Agenda({ db: { address: mongoConnectionString } });

const start = async () => {
  await build(agenda);
  await agenda.start();

  return agenda;
};

export default start;
