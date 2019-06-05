import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import { black , gray03, white } from "../../settings/colors";
import EventCondition from "../atoms/EventCondition";

const Container = styled.div`
    width: 100%;
    height: 15vh;
    background-color: #151515;
    color: #FFFFFF;
    font-size: 1.09em;
    line-height: 1.2em;
    margin-left: 10px;
`;

const Row = styled.div`
	width: 100%;
	display: flex;
	margin-top: 20px;
`;

const Space = styled.div`
	width: 15px;
	height: 10px;
`;

const EventConditions = () => (
	<Container>
		<Row>
			<EventCondition />
			<Space />
			<EventCondition />	
		</Row>
		<Row>
			<EventCondition />
			<Space />	
			<EventCondition />	
		</Row>
	</Container>
);

export default EventConditions;