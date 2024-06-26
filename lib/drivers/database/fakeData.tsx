import IProperty from '../../domain/entities/IProperty';
import ITaskType from '../../domain/entities/ITaskType';
import ITransactionType from '../../domain/entities/ITransactionType';

import {
  ELECTRICITY,
  GAS,
  LEASE,
  MAINTENANCE,
  PAYMENT,
  WATER
} from '../../useCases/TaskUseCases';

import { GENERIC } from '../../useCases/TaskTypeUseCases';

const transactionType: ITransactionType = {
  name: GENERIC
};

const properties: IProperty[] = [
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
    name: LEASE,
    description: 'Lease payment'
  },
  {
    name: ELECTRICITY,
    description: 'Electricity payment'
  },
  {
    name: WATER,
    description: 'Water payment'
  },
  {
    name: GAS,
    description: 'Gas payment'
  },
  {
    name: MAINTENANCE,
    description: 'Maintenance payment'
  },
  {
    name: PAYMENT,
    description: 'Generic payment'
  }
];

export default { properties, taskTypes, transactionType };
