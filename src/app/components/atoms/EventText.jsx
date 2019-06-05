import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import { black , gray03, white } from "../../settings/colors";

const Container = styled.div`
	width: 100%;
	height: auto;
	background-color: ${gray03};
	color: ${white};
	font-size: 1.1em;
	line-height: 1.2em;

`;

const EventText = ({ text }) => <Container>{ text }</Container>;

EventText.propTypes = {
  text: PropTypes.string,
};

EventText.defaultProps = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export default EventText;