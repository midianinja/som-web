import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green } from '../../../settings/colors';
import TagList from '../../../components/molecules/TagList';
import EventDate from '../../../components/atoms/EventDate';
import EventPlace from '../../../components/atoms/EventPlace';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import SlimButton from '../../../components/atoms/SlimButton';

const Wrapper = styled.div`
  display: inline-block;
  ${props => props.customStyle}
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Container = styled.div`
  display: flex;
  text-align: start;
  width: 250px;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  vertical-align: top;
  @media (max-width: 768px) {
      width: 100%;
    }
`;

const View = styled.div`
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Image = styled.div`
  ${props => `
    background-image: url('${props.image}');
    height: 140px;
    width: 140px;
    background-repeat: no-repeat
    background-size: auto 100%;
    @media (max-width: 768px) {
      width: 100%;
      max-height: 300px;
    }
  `}
`;
const Title = styled.label`
  color: ${green};
  font-size: 1em;
  margin-bottom: 10px;
  display: block;
`;
const customButtomStyl = `
  width: 120px;
  height: 25;
  padding-left: 5px
  padding-right: 5px
`;

const buttonStyl = `
  height: 25px;
`;

const tagListStyl = `
  margin: 10px 0;
`;

const eventDetailsStyl = `
  height: 100px;
`;

const isSubscribed = (event, user) => {
  if (!user || !user.artist) return false;
  const artistIsSubscribed = event.subscribers.find((subs) => {
    if (subs.id === user.artist.id) return true;
    return false;
  });
  return !!artistIsSubscribed;
};

function EventCard({
  event, customStyle, user,
  subscribeAction, unsubscribeAction,
}) {
  const [hover, setHover] = useState(false);
  const musicalStyles = event.music_styles ? event.music_styles
    : [];

  return (
    <Wrapper customStyle={customStyle}>
      <Container>
        <View>
          <View>
            <Image
              image={event.cover}
            />
            <TagList
              data={musicalStyles}
              customStyle={tagListStyl}
            />
          </View>
          <View customStyle={eventDetailsStyl}>
            <Title>
              {event.name}
            </Title>
            <EventDate
              day={new Date(+event.subscribe_closing_date).getDate()}
              month={new Date(+event.subscribe_closing_date).getMonth() + 1}
              year={new Date(+event.subscribe_closing_date).getFullYear()}
            />
            <EventPlace
              address={event.location.address}
              city={event.location.city}
              state={event.location.state}
              district={event.location.district}
            />
          </View>
        </View>
        <ButtonWrapper>
          {
            +event.subscribe_closing_date < new Date().getTime()
              ? (
                <PrimaryButton
                  onFocus={() => null}
                  onBlur={() => null}
                  customStyle={buttonStyl}
                  onClick={() => null}
                  disabled
                >
                  Inscrições encerradas
                </PrimaryButton>
              ) : null
          }
          {
            !isSubscribed(event, user) && !(+event.subscribe_closing_date < new Date().getTime())
              ? (
                <PrimaryButton
                  customStyle={buttonStyl}
                  onClick={subscribeAction}
                >
                  Inscrever-se
                </PrimaryButton>
              ) : null
          }
          {
            isSubscribed(event, user) && !(+event.subscribe_closing_date < new Date().getTime())
              ? (
                <SlimButton
                  onFocus={() => null}
                  onBlur={() => null}
                  onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}
                  onClick={() => unsubscribeAction}
                  customStyle={customButtomStyl}
                >
                  { !hover ? 'Inscrito' : 'Desinscrever'}
                </SlimButton>
              ) : null
          }
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
}

const eventShape = {};
const userShape = {};

EventCard.propTypes = {
  customStyle: PropTypes.string.isRequired,
  subscribeAction: PropTypes.func.isRequired,
  unsubscribeAction: PropTypes.func.isRequired,
  event: PropTypes.objectOf(PropTypes.shape(eventShape)).isRequired,
  user: PropTypes.objectOf(PropTypes.shape(userShape)).isRequired,
};

export default EventCard;
