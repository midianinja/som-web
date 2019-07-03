import React from 'react';
import styled from 'styled-components';
import { black, gray03, gray04 } from '../settings/colors';
import EventInfo from '../components/molecules/EventInfo';
import OtherEvents from '../components/molecules/OtherEvents';
import ProductorCard from '../components/molecules/ProductorCard';
import EventText from '../components/atoms/EventText';
import Header from '../components/organisms/Header';
import Cover from '../components/atoms/Cover';
import EventConditions from '../components/molecules/EventConditions';

const Container = styled.div`
  background-color: ${black};
  width: 100%;
  text-align: center;
`;

const ProductorCardWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const CoverWrapper = styled.div`
  width: 100%;
  z-index: 0;
  top: 0;

  @media (min-width: 1024px) {
    position: fixed;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
`;

const Content = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  max-width: 1024px;

  @media (min-width: 1024px) {
    padding-top: 350px;
  }
`;

const ColumnWrapper = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: top;
  @media (min-width: 1024px) {
    max-width: calc(100% - 454px);
    margin-left: 484px;
  }
`;

const OtherEventsWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const EventImage = styled.img`
  width: 0;
  height: 0;
  visibility: hidden;
`;

const EventPage = () => (
  <Container>
    <Header
      name="Fulana Ciclana"
      avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
    />
    <CoverWrapper>
      <Cover cover="http://criadomundo.com.br/uploads/usr/M%C3%BAsica/15385515_700952200078178_6198409953390204640_o.jpg">
        <EventImage src="http://criadomundo.com.br/uploads/usr/M%C3%BAsica/15385515_700952200078178_6198409953390204640_o.jpg" alt="Cover do Evento" />
        <HeaderWrapper />
      </Cover>
    </CoverWrapper>
    <Content>
      <EventInfo />
      <ColumnWrapper>
        <EventText />
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
      </ColumnWrapper>
    </Content>
  </Container>
);

export default EventPage;
