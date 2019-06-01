import React from 'react';
import styled from 'styled-components';
import LinkButton from '../components/atoms/LinkButton';
import TagList from '../components/molecules/TagList';
import InputGroup from '../components/molecules/InputGroup';
import PasswordInput from '../components/atoms/PasswordInput';
import UploadPhotoButton from '../components/atoms/UploadPhotoButton.atom';
import StepFormHeader from '../components/organisms/stepFormHeader.organism';

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
        }
      ]}
      index={1}
    />
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
    <InputGroup label="Nome" error="Nome inválido" info="Apenas letras" />
    <Space />
    <PasswordInput placeholder="Digite sua senha aqui" />
    <Space />
  </Wrapper>
);

export default Main;
