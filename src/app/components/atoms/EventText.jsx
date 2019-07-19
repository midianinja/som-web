import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gray04, white } from '../../settings/colors';

const Container = styled.section`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 40px;

  @media (min-width: 1024px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const Title = styled.h3`
  font-size: 1em;
  color: ${white};
  text-align: left;
  margin-bottom: 10px;
  font-weight: 400;
`;

const Text = styled.p`
  font-size: 0.8571428571em;
  color: ${white};
  text-align: left;
  line-height: 1.6em;
  font-weight: 300;
  padding-bottom: 40px;
  border-bottom: solid 1px ${gray04};
`;

function EventText({ text }) {
  return (
    <Container>
      <Title>Sobre o evento</Title>
      <Text>{text}</Text>
    </Container>
  );
}

EventText.propTypes = {
  text: PropTypes.string,
};

EventText.defaultProps = {
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default EventText;
