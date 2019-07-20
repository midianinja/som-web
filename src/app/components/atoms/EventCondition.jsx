import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, red } from '../../settings/colors';

const Container = styled.div`
  display: ${(props) => {
    const { checked } = props;
    return checked ? 'inline-flex' : 'none';
  }}
  flex-direction: column;
  with: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-bottom: 5px;
`;

const ECondition = styled.label`
  display: block;
  vertical-align: middle;
  color: white;
  font-size: 1em;
  line-height: 1.4em;
  margin-bottom: 5px;
`;

const Status = styled.div`
  margin-left: 5px;
  color: ${(props) => {
    const { checked } = props;
    return checked ? green : red;
  }};
  font-size: 1em;
  line-height: 1.4em;
`;

const EventCondition = ({ condition, checked, title }) => (
  <Container checked={checked}>
    <div>
      <Icon src={`/icons/${condition}.svg`} />
      <ECondition>{title}</ECondition>
    </div>
    <Status checked={checked}>
      <Icon src='/icons/checked.svg' />
    </Status>
  </Container>
);

EventCondition.propTypes = {
  condition: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.string,
};

EventCondition.defaultProps = {
  condition: 'calendar',
  checked: false,
  title: 'Transporte',
};

export default EventCondition;
