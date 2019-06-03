import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { white, black } from "../../settings/colors";

const Container = styled.div`
	display: flex;
	with: 100%;
`;

const Icon = styled.img`
  width: 1.6em;
  height: 1.6em;
  vertical-align: middle;
`;

const Adress = styled.div`
	margin-left: 5px;
	color: white;
	font-size: 1em;
	line-height: 1.4em;	
`;

const EventPlace = ({ address, city, state }) => (
	<Container>
		<Icon src="/icons/place_mark.svg" />
		<Adress> {address ? `${address} ,` : ''} {city}, {state}</Adress>
	</Container>
);

export default EventPlace;