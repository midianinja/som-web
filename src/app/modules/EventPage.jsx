import React from 'react';
import styled from 'styled-components';

import { black , gray03, gray04 } from "../settings/colors";
import EventInfo from "../components/molecules/EventInfo";
import OtherEvents from "../components/molecules/OtherEvents";
import ProductorCard from "../components/molecules/ProductorCard";
import	EventText from "../components/atoms/EventText";
import EventConditions from "../components/molecules/EventConditions";

const Container = styled.div`
  background-color: ${black};
  height: 100vh;
  overflo-y: auto;
  width: 100%;
  padding: 25px;
`;

const Containertwo = styled.div`
  background-color: ${gray03};
  min-height: 100vh;
  width: 100%;
  padding: 40px 25px;
`;

const Space = styled.div`
  height: 25px;
  width: 100%;
`;

const EventImage = styled.div`
	width: 100%;
	height: 60vh;
	background-color: yellow;
`;

const HorizontalLine = styled.hr`
	color: ${gray04};
	margin: 25px 0px;
`;

const EventPage = () => (
	<div>
		<Container>
			<EventImage />
			<EventInfo />
		</Container>
		<Containertwo>
			<EventText />
			<HorizontalLine />
			<EventConditions />
			<ProductorCard />
		</Containertwo>
		<Container>
			<OtherEvents name="Pedro Ricardo" at="de" />
			<Space />
			<OtherEvents name="Rio de Janeiro" at="no"/>
		</Container>
	</div>
);

export default EventPage;
