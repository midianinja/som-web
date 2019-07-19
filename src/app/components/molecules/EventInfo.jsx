import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';

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

const unixTime = (unixtime) =>
  new Date(+unixtime)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

const EventInfo = ({ name, date, place, subscribers, subscribeAction }) => {
  const dateInstance = new Date(unixTime(date));
  return (
    <Container>
      <Title>{name}</Title>
      <Space />
      <EventDate day={dateInstance.getDate()} month={dateInstance.getMonth() + 1} year={dateInstance.getFullYear()} />
      <SubSpace />
      <EventPlace address={place.address} city={place.city} state={place.state} district={place.district} />
      <SubSpace />
      <EventBands subscribed={subscribers} />
      <Space />
      <ButtonWrapper>
        <PrimaryButton onClick={subscribeAction}>Inscrever-se</PrimaryButton>
      </ButtonWrapper>
    </Container>
  );
};

const placeShape = {
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
};

EventInfo.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  subscribers: PropTypes.number,
  place: PropTypes.shape(placeShape),
  subscribeAction: PropTypes.func.isRequired,
};

EventInfo.defaultProps = {
  name: '',
  date: '',
  subscribers: 0,
  place: {},
};

export default EventInfo;
