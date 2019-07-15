import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  with: 100%;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: middle;
`;

const EDate = styled.h4`
  margin-left: 5px;
  color: white;
  font-size: 0.8571428571em;
  font-weight: 300;
`;

const EventDate = ({ day, month, year }) => (
  <Container>
    <Icon src="/icons/calendar.svg" />
    <EDate>{`${day}/${month}/${year}`}</EDate>
  </Container>
);

EventDate.propTypes = {
  day: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
};

EventDate.defaultProps = {
  day: '00',
  month: '00',
  year: '0000',
};

export default EventDate;
