import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';

import EventCard from "./EventCard";
import LinkButton from "../atoms/LinkButton";

const Container = styled.div`
	width: 100%;
	height: auto;
`;

const Space = styled.div`
  height: 15px;
  width: 100%;
`;

const HSpace = styled.div`
  width: 5px;
`;

const Header = styled.div`
	width: 100%;
	display: flex;
`;

const Title = styled.div`
  font-size: 1.3em;
  line-height: 1.3em;
  color: white;
`;

const OtherEvents = () => (
<Container>
	<Header>
		<Title>Outros Eventos de </Title> <HSpace />
		<LinkButton color="green" fontSize="xlarge" size="default">
			Carlos Eduardo
		</LinkButton> 
	</Header>
	<Space />
	<EventCard />
	<Space />
	<EventCard />	
</Container>
);

export default OtherEvents;