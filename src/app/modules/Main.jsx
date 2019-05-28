import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../components/atoms/PrimaryButton';
import TagList from '../components/molecules/TagList';
import { black } from '../settings/colors';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 45px;
  background-color: ${black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
`;

const Space = styled.div`
  height: 60px;
`;

const Main = () => (
  <Wrapper>
    <PrimaryButton disabled>CLIQUE-ME</PrimaryButton>
    <Space />
    <TagList
      text="samba"
      handleClose={() => console.log('here')}
      data={[
        { text: 'forrô', id: 'cib1', color: 'purple' },
        { text: 'funck', id: 'cib2', color: 'yellow' },
        { text: 'axé', id: 'cib3', color: 'green' },
        { text: 'samba', id: 'cib4', color: 'orange' },
      ]}
    />
    <Space />
  </Wrapper>
);

export default Main;
