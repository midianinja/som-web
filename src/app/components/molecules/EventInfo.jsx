import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';

import EventDate from '../atoms/EventDate';
import EventPlace from '../atoms/EventPlace';
import EventBands from '../atoms/EventBands';
import PrimaryButton from '../atoms/PrimaryButton';
import SlimButton from '../atoms/SlimButton';

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  max-width: 440px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  color: ${white};

  @media (min-width: 1024px) {
    position: fixed;
    padding-left: 0px;
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

const unixTime = unixtime => new Date(+unixtime).toISOString().slice(0, 19)
  .replace('T', ' ');

const EventInfo = ({
  name, date, place, subscribers, subscribeAction, subscribed,
  unsubscribeAction,
}) => {
  const dateInstance = new Date(unixTime(date));
  const [hover, setHover] = useState(false);

  return (
    <Container>
      <Title>{name}</Title>
      <Space />
      <EventDate
        day={dateInstance.getDate()}
        month={dateInstance.getMonth() + 1}
        year={dateInstance.getFullYear()}
      />
      <SubSpace />
      <EventPlace
        address={place.address}
        city={place.city}
        state={place.state}
        district={place.district}
      />
      <SubSpace />
      <EventBands subscribed={subscribers} />
      <Space />
      <ButtonWrapper>
        {
          !subscribed
            ? <PrimaryButton onClick={subscribeAction}>Inscrever-se</PrimaryButton>
            : null
        }
        {
          subscribed
            ? (
              <SlimButton
                onFocus={() => null}
                onBlur={() => null}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
                onClick={unsubscribeAction}
                customStyle={`
                  width: 120px;
                  padding-left: 5px
                  padding-right: 5px
                `}
              >
                { !hover ? 'Inscrito' : 'Desinscrever'}
              </SlimButton>
            ) : null
        }
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
  subscribed: PropTypes.bool,
  place: PropTypes.shape(placeShape),
  subscribeAction: PropTypes.func.isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
};

EventInfo.defaultProps = {
  name: '',
  date: '',
  subscribers: 0,
  subscribed: false,
  place: {},
};

export default EventInfo;
