import executeSeeder from './lib/drivers/database/seeder';

type SeederStringParams = {
  seed_fake_data: string;
  delete_data: string;
  seed_types: string;
};
const args = process.argv.slice(2); // Get command line arguments, excluding node and script path
const params: SeederStringParams = args.reduce<SeederStringParams>(
  (acc, arg) => {
    const [key, value] = arg.split('='); // Split argument by '=' to get key-value pairs
    if (key && value) {
      acc[key.replace('--', '')] = value; // Remove '--' from key and assign value to the object
    }
    return acc;
  },
  { seed_fake_data: '', delete_data: '', seed_types: '' }
);

const seedFakeData: boolean = !!(
  params.seed_fake_data && params.seed_fake_data.toLowerCase() === 'true'
);

const deleteData: boolean = !!(
  params.delete_data && params.delete_data.toLowerCase() === 'true'
);

const seedTypes: boolean = !!(
  params.seed_types && params.seed_types.toLowerCase() === 'true'
);

executeSeeder(seedFakeData, deleteData, seedTypes);
