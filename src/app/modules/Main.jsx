import React from 'react';
import styled from 'styled-components';
import LinkButton from '../components/atoms/LinkButton';
import TagList from '../components/molecules/TagList';
import InputGroup from '../components/molecules/InputGroup';
import PasswordInput from '../components/atoms/PasswordInput';
import UploadPhotoButton from '../components/atoms/UploadPhotoButton.atom';
//import StepFormHeader from '../components/organisms/stepFormHeader.organism';
import ProductorCard from '../components/molecules/ProductorCard';
import UploaderButton from '../components/atoms/uploaderButton';
import UploadFile from '../components/molecules/uploadFile';
import FollowersAndFollowing from '../components/atoms/FollowersAndFollowing';

import { black } from '../settings/colors';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
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
 
    <UploadPhotoButton type="big" onClick={() => console.log('informação')} />
    <Space />
    <LinkButton>Link button</LinkButton>
    <Space />
    <UploaderButton text='Arquivo'/>
    <Space />
    <FollowersAndFollowing />
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
    <InputGroup label="Nome" error="Nome inválido" info="Apenas letras" />
    <Space />
    <PasswordInput placeholder="Digite sua senha aqui" />
    <Space />
    <UploadFile title="Mapa de palco" subtitle="Com esse desenho fica mais fácil saber a posição de todos equipamentos no palco" type="Mapa"  />
    <Space />
    <ProductorCard />
  </Wrapper>
);

export default Main;
