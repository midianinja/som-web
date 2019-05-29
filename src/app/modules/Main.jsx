import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../components/atoms/PrimaryButton';
import LinkButton from '../components/atoms/LinkButton';
import TagList from '../components/molecules/TagList';
import Input from '../components/atoms/Input';
import DialogModal from '../components/modals/Dialog.modal';
import PasswordInput from '../components/atoms/PasswordInput';
import InfoButton from '../components/atoms/InfoButton.atom';

import { black } from '../settings/colors';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
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
  font-size: 1em;
`;
const Main = () => (
  <Wrapper>
    <InfoButton onClick={() => console.log('informação')} />
    <PrimaryButton>CLIQUE-ME</PrimaryButton>
    <Space />
    <LinkButton>Link button</LinkButton>
    <Space />
    <TagList
      text="samba"
      handleClose={() => console.log('here')}
      data={[
        { text: 'forrô', id: 'cib1', color: 'purple' },
        { text: 'funk', id: 'cib2', color: 'yellow' },
        { text: 'axé', id: 'cib3', color: 'green' },
        { text: 'samba', id: 'cib4', color: 'orange' },
      ]}
    />
    <Space />
    <Input placeholder="Digite aqui" />
    <Space />
    <PasswordInput placeholder="Digite sua senha aqui" />
    <Space />
  </Wrapper>
);

export default Main;
