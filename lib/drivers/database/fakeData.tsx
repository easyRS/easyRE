import IProperty from '../../domain/entities/IProperty';

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

export default { properties };
