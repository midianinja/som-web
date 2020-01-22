import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, white } from '../../../settings/colors';
import Store from '../../../store/Store';
import TagList from '../../../components/molecules/TagList';
import { dateToStringDDMMYYY } from '../../../utilities/date.utils';
import EventDate from '../../../components/atoms/EventDate';
import EventPlace from '../../../components/atoms/EventPlace';

const Wrapper = styled.div`
  display: inline-block;
  text-align: start;
  width: 300px;
  vertical-align: top;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px 10px;
  }
`;

const Image = styled.div`
  ${props => `
    background-image: url('${props.image}');
    height: 180px;
    width: 180px;
    background-repeat: no-repeat;
    background-size: auto 100%;
    @media (max-width: 1024px) {
      width: 100%;
      max-height: 300px;
    }
  `}
`;
const Title = styled.label`
  color: ${green};
  font-size: 1.2em;
  margin-bottom: 10px;
  display: block;
`;

const EventLocation = styled.label`
  color: ${white};
  font-size: 1em;
  display: block;
`;

const colors = [
  'purple',
  'green',
  'orange',
  'magenta',
  'yellow',
];

function EventCard({ customStyle, event }) {
  console.log('event:', event);
  const musicalStyles = event.music_styles ? event.music_styles
    : [{
      id: new Date().getTime(),
      text: 'Sem restrições de estilo',
      color: colors[Math.floor(Math.random() * 5)],
    }];

  return (
    <Wrapper>
      <Image
        image={event.cover}
      />
      <TagList
        data={musicalStyles}
        customStyle="margin: 10px 0;"
      />
      <Title>
        {event.name}
      </Title>
      <EventDate
        day={new Date(+event.event_date).getDate()}
        month={new Date(+event.event_date).getMonth() + 1}
        year={new Date(+event.event_date).getFullYear()}
      />
      <EventPlace
        address={event.location.address}
        city={event.location.city}
        state={event.location.state}
        district={event.location.district}
      />
    </Wrapper>
  );
}
EventCard.propTypes = {
  customStyle: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default EventCard;
/* <ButtonWrapper>
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
      </ButtonWrapper> */