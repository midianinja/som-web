import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import { black , gray03, white } from "../../settings/colors";

const Container = styled.div`
    width: 100%;
    height: 18vh;
    background-color: #151515;
    color: #FFFFFF;
    font-size: 1.09em;
    line-height: 1.2em;
    margin-left: 10px;
`;

const EventConditions = () => (
	<Container>
		A vida é hoje
	</Container>
);

export default EventConditions;