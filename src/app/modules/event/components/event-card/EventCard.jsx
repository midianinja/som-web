import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import EventDate from '../../../../components/atoms/EventDate';
import PrimaryButton from '../../../../components/atoms/PrimaryButton';
import {
  Container,
  EventInfoWrapper, Link,
  ButtonWrapper, buttonCustomStyle,
  ClosingDateTimer, ClockIcon, coverStyle,
} from './eventCard.style';
import Cover from '../../../../components/atoms/Cover';

const unixTime = unixtime => new Date(+unixtime).toISOString().slice(0, 19);

const Eventcard = ({ event, customStyle }) => {
  const closingDateInstance = moment(new Date(unixTime(event.subscribe_closing_date)));
  const todayInstance = moment();

  const diffDays = Math.floor(closingDateInstance.diff(todayInstance, 'days', true));
  const diffHours = Math.ceil(closingDateInstance.diff(todayInstance, 'hours', true));

  const isClosingSubscribe = diffDays <= 0 && diffHours <= 0;
  const newDate = new Date(unixTime(event.event_date));
  const dateInstance = moment(newDate);
  // const [hover, setHover] = useState(false);
  const dayLabel = diffDays === 1 ? 'dia' : 'dias';
  const hourLabel = diffHours === 1 ? 'hora' : 'horas';

  let label = 'Inscrições encerradas';
  if (diffHours > 0) label = `${diffHours} ${hourLabel} para o fim das inscrições`;
  if (diffDays > 0) label = `${diffDays} ${dayLabel} para o fim das inscrições`;
  return (
    <Container customStyle={customStyle}>
      <Cover
        customStyle={coverStyle}
        cover={event.cover.mimified}
        >
        <EventInfoWrapper>
          <EventDate
            day={dateInstance.date()}
            month={dateInstance.month() + 1}
            year={dateInstance.year()}
          />
          <Link href={`/event/${event.id}`}>{event.name}</Link>
          <ButtonWrapper>
            {
              isClosingSubscribe ? (
                <PrimaryButton disabled size="small" customStyle={buttonCustomStyle}>
                  Inscrições encerradas
                </PrimaryButton>
              ) : (
                <>
                  <PrimaryButton size="small" customStyle={buttonCustomStyle}>
                    Inscrever-se
                  </PrimaryButton>
                  <ClosingDateTimer>
                    <ClockIcon src="/icons/clock.svg" alt="icone de um relógio" />
                    {label}
                  </ClosingDateTimer>
                </>
              )
            }
          </ButtonWrapper>
        </EventInfoWrapper>
      </Cover>
    </Container>
  );
};
const eventShape = {
  subscribe_closing_date: PropTypes.string,
  event_date: PropTypes.string,
  cover: PropTypes.object,
  id: PropTypes.string,
};

Eventcard.propTypes = {
  event: PropTypes.shape(eventShape).isRequired,
  customStyle: PropTypes.string,
}

Eventcard.defaultProps = {
  customStyle: '',
}

export default Eventcard;
