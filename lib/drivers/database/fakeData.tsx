import IProperty from '../../domain/entities/IProperty';
import ITaskType from '../../domain/entities/ITaskType';

import IConfig from '../../domain/entities/IConfig';

const config: IConfig = {
  isDailyJobRunning: false
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
    name: 'Alquiler',
    description: 'Pago de alquiler'
  },
  {
    name: 'Electricidad',
    description: 'Pago de electricidad'
  },
  {
    name: 'Agua',
    description: 'Pago de agua'
  },
  {
    name: 'Gas',
    description: 'Pago de gas'
  },
  {
    name: 'Mantenimiento',
    description: 'Mantenimiento de algo'
  }
];

export default { properties, taskTypes, config };
