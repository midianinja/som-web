import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';
import LinkButton from './LinkButton';

const Container = styled.div`
  display: flex;
  with: 100%;
`;

const Icon = styled.img`
  width: 1.6em;
  height: 1.6em;
  vertical-align: middle;
`;

const LinkContainer = styled.div`
  margin-left: 5px;
  font-size: 1em;
  line-height: 1.4em;
`;

const EventDate = ({ subscribed }) => (
  <Container>
    <Icon src='/icons/audio_track.svg' />
    <LinkButton color='green' size='default' fontSize='large'>
      {' '}
      {`${subscribed} bandas inscritas`}
    </LinkButton>
  </Container>
);

export default EventDate;
