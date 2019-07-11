import React from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  background-color: ${black};
  align-items: center;
  font-size: 1em;
  overflow-y: auto;
`;

const Main = () => (
  <Wrapper />
);

export default Main;
