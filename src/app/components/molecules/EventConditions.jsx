import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { white } from '../../settings/colors';
import EventCondition from '../atoms/EventCondition';

const Container = styled.div`
  width: 100%;
  font-size: 0.8571428571em;
  line-height: 1.5em;
  font-weight: 300;
  color: ${white};
  text-align: center;
  margin-bottom: 20px;
`;

const EventConditions = ({ conditions }) => (
  <Container>
    <EventCondition title='Transporte' condition='directions-car' checked={conditions.has_local_transportation} />
    <EventCondition title='Acomodações' condition='hotel' checked={conditions.has_accommodation} />
    <EventCondition title='Alimentacção' condition='local-dining' checked={conditions.has_food} />
    <EventCondition title='Bilheteria' condition='money' checked={conditions.has_money_paid} />
  </Container>
);

const conditionsShape = {
  has_local_transportation: PropTypes.bool.isRequired,
  has_accommodation: PropTypes.bool.isRequired,
  has_food: PropTypes.bool.isRequired,
};

EventConditions.propTypes = {
  conditions: PropTypes.shape(conditionsShape).isRequired,
};

export default EventConditions;
