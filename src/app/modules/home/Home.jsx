import React from 'react';
import styled from 'styled-components';
import Apresentation from './components/Apresentation';

const Page = styled.div`
  width: 100%;
`;

const Home = () => (
  <Page>
    <Apresentation />
  </Page>
);

export default Home;
