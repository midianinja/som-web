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
  max-width: 420px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  color: ${white};

  @media (min-width: 1024px) {
    position: fixed;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
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

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const EventInfo = ({ name, date, place, bands }) => (
  <Container>
    <Title>Bananada 2017</Title>
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
