import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, wrapperModal, white } from '../../../settings/colors';
import TagList from '../../../components/molecules/TagList';
import EventDate from '../../../components/atoms/EventDate';
import EventPlace from '../../../components/atoms/EventPlace';

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
      align-items: center;
    }
`;

const View = styled.div`
`;

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const IMAGE_SIZE = {
  mobile: {
    height: '140px',
    width: '140px',
  },
  desktop: {
    height: '140px',
    width: '140px',
  },
};

const Image = styled.img`
  ${props => `
    background-image: url('${props.image}');
    height: ${IMAGE_SIZE.mobile.height};
    width: ${IMAGE_SIZE.mobile.width};
    background-repeat: no-repeat
    background-size: auto 100%;
  `}
`;

const ImageHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${IMAGE_SIZE.mobile.height};
  width: ${IMAGE_SIZE.mobile.width};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${wrapperModal};
  cursor: pointer;
  @media (max-width: 768px) {
    right: 0;
    margin: auto;
  }
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

const Label = styled.label`
  color: ${white};
  width: 100px;
  text-align: center;
  font-size: 1em;
  cursor: pointer;
`;

const Title = styled.label`
  color: ${green};
  font-size: 1em;
  margin-bottom: 10px;
  display: block;
  cursor: pointer
`;

const tagListStyl = `
  margin: 10px 0;
`;

const eventDetailsStyl = `
  height: 100px;
`;

const FakeButton = styled.label`
  border: 1px solid ${white};
  border-radius: 38px;
  width: 130px;
  color: ${white};
  text-align: center;
  font-size: .7em;
  padding: 3px 5px;
`;

function EventCard({
  event, customStyle,
}) {
  const [cardHover, setCardHover] = useState(false);
  const musicalStyles = event.music_styles ? event.music_styles
    : [];

  return (
    <Wrapper
      customStyle={customStyle}
      onMouseEnter={() => setCardHover(!cardHover)}
      onMouseLeave={() => setCardHover(!cardHover)}
    >
      <Container>
        <View>
          <View>
            <ImageContainer>
              <Image
                image={event.photo.mimified}
              />
              {
                cardHover
                  ? (
                    <ImageHover>
                      <Icon src="/icons/tool.svg" />
                      <Label>Administrar evento</Label>
                    </ImageHover>
                  ) : null
              }
            </ImageContainer>
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
        <FakeButton>
          {+event.subscribe_closing_date < new Date().getTime() ? 'Inscrições encerradas' : 'Inscrições abertas'}
        </FakeButton>
      </Container>
    </Wrapper>
  );
}

const eventShape = {};

EventCard.propTypes = {
  customStyle: PropTypes.string.isRequired,
  event: PropTypes.objectOf(PropTypes.shape(eventShape)).isRequired,
};

export default EventCard;
