import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black, green } from '../../settings/colors';

const Container = styled.div`
  display: flex;
  with: 100%;
`;

const Icon = styled.img`
  width: 1.6em;
  height: 1.6em;
  vertical-align: middle;
`;

const ECondition = styled.div`
  margin-left: 5px;
  color: white;
  font-size: 1em;
  line-height: 1.4em;
`;

const Status = styled.div`
  margin-left: 5px;
  color: ${green};
  font-size: 1em;
  line-height: 1.4em;
`;

const EventCondition = ({ condition, status, title }) => (
  <Container>
    <Icon src={`/icons/${condition}.svg`} />
    <ECondition>{title}</ECondition>
    <Status>Sim</Status>
  </Container>
);

EventCondition.propTypes = {
  condition: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
};

EventCondition.defaultProps = {
  condition: 'calendar',
  status: 'Sim',
  title: 'Transporte',
};

export default EventCondition;
