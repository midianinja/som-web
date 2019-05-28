import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { black } from '../settings/colors';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 45px;
  background-color: ${black};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
`;

const Main = () => (
  <Wrapper>
    <PrimaryButton disabled>CLIQUE-ME</PrimaryButton>
  </Wrapper>
);

export default Main;
