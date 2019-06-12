import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkButton from './LinkButton';

const Container = styled.div`
  display: flex;
  with: 100%;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: middle;
`;

const LinkContainer = styled.div`
  margin-left: 5px;
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.5em;
`;

const EventDate = ({ subscribed }) => (
  <Container>
    <Icon src='/icons/audio_track.svg' />
    <LinkContainer>
      <LinkButton color='green' size='default' fontSize='large'>
        {' '}
        {`${subscribed} bandas inscritas`}
      </LinkButton>
    </LinkContainer>
  </Container>
);

export default EventDate;
