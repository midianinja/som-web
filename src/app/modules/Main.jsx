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
import ProductorCard from '../components/molecules/ProductorCard';
import EventInfo from '../components/molecules/EventInfo';
import FollowersAndFollowing from '../components/atoms/FollowersAndFollowing';
import OtherEvents from '../components/molecules/OtherEvents';

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

const Space = styled.div`
  height: 60px;
  font-size: 1em;
`;

const Main = () => (
  <Wrapper>
    <InputGroup label='Nome' error='Nome inválido' info='Apenas letras'>
      <Input placeholder='Digite aqui' />
    </InputGroup>
    <Space />
    <PasswordInput placeholder='Digite sua senha aqui' />
    <Space />
    <ProductorCard />
    <Space />
    <EventInfo />
    <Space />
    <OtherEvents />
  </Wrapper>
);

export default Main;
