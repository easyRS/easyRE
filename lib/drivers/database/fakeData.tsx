import IProperty from '../../domain/entities/IProperty';
import ITaskType from '../../domain/entities/ITaskType';
import ITransactionType from '../../domain/entities/ITransactionType';

import IConfig from '../../domain/entities/IConfig';

const config: IConfig = {
  isDailyJobRunning: false
};

const transactionType: ITransactionType = {
  name: 'Test'
};

const properties: IProperty[] = [
  {
    amount: 1,
    coordinates: [42, 4],
    measure: 'measure 1',
    name: 'name 1',
    location_details: 'location_details 1',
    description: 'this is a long description 1'
  },
  {
    amount: 2,
    coordinates: [52, 43],
    measure: 'measure 2',
    name: 'name 2',
    location_details: 'location_details 2',
    description: 'this is a long description 2'
  },
  {
    amount: 3,
    coordinates: [432, 53],
    measure: 'measure 3',
    name: 'name 3',
    location_details: 'location_details 3',
    description: 'this is a long description 3'
  }
];

const taskTypes: ITaskType[] = [
  {
    name: 'Lease',
    description: 'Lease payment'
  },
  {
    name: 'Electricity',
    description: 'Electricity payment'
  },
  {
    name: 'Water',
    description: 'Water payment'
  },
  {
    name: 'Gas',
    description: 'Gas payment'
  },
  {
    name: 'Maintenance',
    description: 'Maintenance payment'
  }
];

export default { properties, taskTypes, config, transactionType };
