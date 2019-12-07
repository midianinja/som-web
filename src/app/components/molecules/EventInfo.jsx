import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

const ClockIcon = styled.img`
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-right: 5px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: 400;
  line-height: 1.1em;
  text-align: left;
`;

const ClosingDateTimer = styled.div`
  display: block;
  margin-bottom: 20px;
  font-size: 0.8125em;
  font-weight: 300;
  line-height: 1em;
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

const unixTime = unixtime => new Date(+unixtime).toISOString().slice(0, 19);

const EventInfo = ({
  name, date, place, subscribers, subscribeAction, subscribed,
  unsubscribeAction, isClosingSubscribe, diffDays, diffHours,
}) => {
  const newDate = new Date(unixTime(date));
  const dateInstance = moment(newDate);
  const [hover, setHover] = useState(false);
  const dayLabel = diffDays === 1 ? 'dia' : 'dias';
  const hourLabel = diffHours === 1 ? 'hora' : 'horas';

  let label = 'Inscrições encerradas';
  if (diffHours > 0) label = `${diffHours} ${hourLabel} para o fim das inscrições`;
  if (diffDays > 0) label = `${diffDays} ${dayLabel} para o fim das inscrições`;

  return (
    <Container>
      <ClosingDateTimer>
        <ClockIcon src="/icons/clock.svg" alt="icone de um relógio" />
        {label}
      </ClosingDateTimer>
      <Title>{name}</Title>
      <Space />
      <EventDate
        day={dateInstance.date()}
        month={dateInstance.month() + 1}
        year={dateInstance.year()}
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
          isClosingSubscribe
            ? (
              <PrimaryButton
                onFocus={() => null}
                onBlur={() => null}
                onClick={() => null}
                disabled
              >
                Inscrições encerradas
              </PrimaryButton>
            ) : null
        }
        {
          !subscribed && !isClosingSubscribe
            ? <PrimaryButton onClick={subscribeAction}>Inscrever-se</PrimaryButton>
            : null
        }
        {
          subscribed && !isClosingSubscribe
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
  diffDays: PropTypes.number,
  diffHours: PropTypes.number,
  subscribed: PropTypes.bool,
  isClosingSubscribe: PropTypes.bool,
  place: PropTypes.shape(placeShape),
  subscribeAction: PropTypes.func.isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
};

EventInfo.defaultProps = {
  name: '',
  date: '',
  subscribers: 0,
  diffDays: 0,
  subscribed: false,
  isClosingSubscribe: false,
  place: {},
};

export default EventInfo;
