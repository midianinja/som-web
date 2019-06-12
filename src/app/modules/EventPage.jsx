import React from 'react';
import styled from 'styled-components';
import { black, gray03, gray04 } from '../settings/colors';
import EventInfo from '../components/molecules/EventInfo';
import OtherEvents from '../components/molecules/OtherEvents';
import ProductorCard from '../components/molecules/ProductorCard';
import EventText from '../components/atoms/EventText';
import Cover from '../components/atoms/Cover';
import EventConditions from '../components/molecules/EventConditions';

const Container = styled.div`
  background-color: ${black};
  width: 100%;
`;

const ProductorCardWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const OtherEventsWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const EventImage = styled.img`
  width: 100%;
  visibility: hidden;
`;

const HorizontalLine = styled.hr`
  background-color: ${gray04};
  height: 1px;
  margin-top: 25px;
  margin-bottom: 40px;
  border: none;
`;

const EventPage = () => (
  <Container>
    <Cover cover="/images/temp-event-cover.png">
      <EventImage src="/images/temp-event-cover.png" alt="Cover do Evento" />
    </Cover>
    <EventInfo />
    <EventText />
    <HorizontalLine />
    <EventConditions />
    <ProductorCardWrapper>
      <ProductorCard />
    </ProductorCardWrapper>
    <OtherEventsWrapper>
      <OtherEvents name="Pedro Ricardo" at="de" />
    </OtherEventsWrapper>
    <OtherEventsWrapper>
      <OtherEvents name="Rio de Janeiro" at="no" />
    </OtherEventsWrapper>
  </Container>
);

export default EventPage;
