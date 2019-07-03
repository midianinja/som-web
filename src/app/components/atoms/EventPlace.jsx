import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';

const Container = styled.h4`
  with: 100%;
  max-width: 300px;
  display: flex;
  text-align: left;
`;

const IconWrapper = styled.div``;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: middle;
`;

const Adress = styled.span`
  margin-left: 5px;
  color: white;
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.5em;
`;

const EventPlace = ({ address, city, state }) => (
  <Container>
    <IconWrapper>
      <Icon src='/icons/place_mark.svg' />
    </IconWrapper>
    <Adress>
      {' '}
      {address ? `${address} ,` : ''} {city}, {state}
    </Adress>
  </Container>
);

export default EventPlace;
