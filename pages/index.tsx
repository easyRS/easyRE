import type { NextPage } from 'next';
import { BurgerMenu } from '../lib/components';

import { connect } from '../lib/drivers/database/conn';

import { IProperty } from '../lib/domain/models/Property';

import toJson from '../lib/utils/MongooseToJSON';

type HomeProps = {
  property: IProperty;
};

const Home: NextPage<HomeProps> = (homeprops: HomeProps) => {
  console.log('property is:'); // eslint-disable-line no-console
  console.log(homeprops.property._id); // eslint-disable-line no-console

  const menus: Menu[] = [
    {
      key: '1',
      name: 'Properties'
    },
    {
      key: '2',
      name: 'Tenants'
    },
    {
      key: '3',
      name: 'Contracts'
    }
  ];

  return (
    <>
      <BurgerMenu menus={menus} />
      <div>
        <h1>Hello. welcome to EASY RS</h1>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { Property } = await connect();

  const newProperty = new Property({
    coordinates: [1, 3],
    measure: 'string',
    name: 'string',
    location_details: 'string',
    description: 'string'
  });

  await newProperty.save();
  const property = toJson<IProperty>(newProperty);
  return {
    props: { property }
  };
}

export default Home;
