/**
 * @prettier
 */

import * as React from 'react';
import { NextPage } from 'next';
import Web3 from 'web3';

import ENV from '~/constants/env';

const Home: NextPage = (): React.ReactElement<any> => {
  const web3 = new Web3(ENV.ETHEREUM_NODE_URL);

  console.log(web3);

  return (
    <>
      <div>Hi!</div>
    </>
  );
};

export default Home;
