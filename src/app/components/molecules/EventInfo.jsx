import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black, white } from '../../settings/colors';

import EventDate from '../atoms/EventDate';
import EventPlace from '../atoms/EventPlace';
import EventBands from '../atoms/EventBands';
import PrimaryButton from '../atoms/PrimaryButton';

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  background-color: ${black};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  color: ${white};
`;

const Title = styled.h1`
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 1.5714285714em;
  font-weight: 400;
  line-height: 1.1em;
  text-align: left;
`;

const Space = styled.div`
  height: 10px;
  width: 100%;
`;

const SubSpace = styled.div`
  height: 10px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;
`;

const EventInfo = ({ name, date, place, bands }) => (
  <Container>
    <Title>Nome do Festival</Title>
    <Space />
    <EventDate />
    <SubSpace />
    <EventPlace
      address='Palácio dos Castelos, Rua da Subida, nº 1432 - Santa Teresa'
      city='Rio de Janeiro'
      state='RJ'
    />
    <SubSpace />
    <EventBands subscribed='15' />
    <Space />
    <ButtonWrapper>
      <PrimaryButton>Clique e Participe</PrimaryButton>
    </ButtonWrapper>
  </Container>
);

EventInfo.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  bands: PropTypes.number,
};

export default EventInfo;
