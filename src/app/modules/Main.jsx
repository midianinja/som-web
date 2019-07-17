import React from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Main;
