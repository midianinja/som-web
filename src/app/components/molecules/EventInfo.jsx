import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';

import EventDate from '../atoms/EventDate';
import EventPlace from '../atoms/EventPlace';
import EventBands from '../atoms/EventBands';
import PrimaryButton from '../atoms/PrimaryButton';

const Container = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: auto;
  background-color: ${black};
  padding-top: 10px;
`;

const Title = styled.div`
  font-size: 2em;
  line-height: 2em;
  color: white;
`;

const Space = styled.div`
  height: 30px;
  width: 100%;
`;

const SubSpace = styled.div`
  height: 10px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
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
