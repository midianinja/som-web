import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { black, white } from '../../settings/colors';

const Container = styled.div`
  width: 100%;
  background-color: ${black};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  font-size: 0.8571428571em;
  color: ${white};
  text-align: left;
  line-height: 1.6em;
  font-weight: 300;
`;

const EventText = ({ text }) => <Container>{text}</Container>;

EventText.propTypes = {
  text: PropTypes.string,
};

EventText.defaultProps = {
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default EventText;
