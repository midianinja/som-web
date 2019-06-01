import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../components/atoms/PrimaryButton';
import LinkButton from '../components/atoms/LinkButton';
import TagList from '../components/molecules/TagList';
import InputGroup from '../components/molecules/InputGroup';
import Input from '../components/atoms/Input';
import PasswordInput from '../components/atoms/PasswordInput';
import InfoButton from '../components/atoms/InfoButton.atom';
import Avatar from '../components/atoms/Avatar.atom';

import { black } from '../settings/colors';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 45px;
    background-color: ${black};
    align-items: center;
    font-size: 1em;
    overflow-y: auto;
`;

const Space = styled.div`
height: 60px;
font-size: 1em;
`;

const Main = () => (
  <Wrapper>
    <Avatar src="https://api.adorable.io/avatars/285/abott@adorable.png" />
    <Space />
    <InfoButton onClick={() => console.log('informação')} />
    <Space />
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
    <InputGroup label="Nome" error="Nome inválido" info="Apenas letras">
      <Input placeholder="Digite aqui" />
    </InputGroup>
    <Space />
    <PasswordInput placeholder="Digite sua senha aqui" />
    <Space />
  </Wrapper>
);

export default Main;
