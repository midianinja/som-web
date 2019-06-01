import React from 'react';
import styled from 'styled-components';
import LinkButton from '../components/atoms/LinkButton';
import PrimaryButton from '../components/atoms/PrimaryButton';
import Input from '../components/atoms/Input';
import TagList from '../components/molecules/TagList';
import InputGroup from '../components/molecules/InputGroup';
import PasswordInput from '../components/atoms/PasswordInput';
import InfoButton from '../components/atoms/InfoButton.atom';
import Avatar from '../components/atoms/Avatar.atom';
import ProgressiveImage from '../components/atoms/ProgressiveImage.atom';
import Select from '../components/atoms/Select.atom';
import UploadPhotoButton from '../components/atoms/UploadPhotoButton.atom';
import StepFormHeader from '../components/organisms/StepFormHeader.organism';

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
    <Select
      placeholder="Estado"
      options={[
        { id: 'ba', label: 'Bahia' },
        { id: 'sp', label: 'São Paulo' },
        { id: 'rj', label: 'Rio de Janeiro' },
      ]}
      onClick={() => console.log('onClick')}
    />
    <Space />
    <Avatar src="https://api.adorable.io/avatars/285/abott@adorable.png" />
    <Space />
    <ProgressiveImage
      width="120px"
      height="120px"
      src="https://api.adorable.io/avatars/270/abott@adorable.png"
    />
    <Space />
    <InfoButton onClick={() => console.log('informação')} />
    <Space />
    <PrimaryButton>CLIQUE-ME</PrimaryButton>
    <Space />
    <StepFormHeader
      items={[
        {
          title: 'Crie sua página de artista',
          description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
        },
        {
          title: 'Pagina 2 do caralho',
          description: 'salvando um banza depois do outro.',
        },
        {
          title: 'Maconheiro sem limites',
          description: 'Chega em casa e fala que está com conjutivite.',
        },
        {
          title: 'Nois fuma fuma',
          description: 'Nunca para, maconheiro, sem limites.',
        },
      ]}
      index={1}
    />
    <Space />
    <UploadPhotoButton type="big" onClick={() => console.log('informação')} />
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
