import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';

const Container = styled.div`
  display: flex;
  with: 100%;
`;

const Icon = styled.img`
  width: 1.6em;
  height: 1.6em;
  vertical-align: middle;
`;

const EDate = styled.div`
  margin-left: 5px;
  color: white;
  font-size: 1em;
  line-height: 1.4em;
`;

const EventDate = ({ day, month, year }) => (
  <Container>
    <Icon src='/icons/calendar.svg' />
    <EDate>10/10/2020</EDate>
  </Container>
);

export default EventDate;
