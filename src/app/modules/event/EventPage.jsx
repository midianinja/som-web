import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Cover from '../../components/atoms/Cover';
import EventText from '../../components/atoms/EventText';
import EventInfo from '../../components/molecules/EventInfo';
import EventConditions from '../../components/molecules/EventConditions';
import ProductorCard from '../../components/molecules/ProductorCard';
import Header from '../../components/organisms/Header';
import SubscribedArtists from '../../components/templates/event/SubscribedArtists';
import Subscribed from '../../components/modals/Subscribed';
import Dialog from '../../components/modals/Dialog.modal';
import {
  fetchEventData, initialEvent, initialLoading, loadingStatus, DUMMY_ARTISTS,
} from './EventController';
import { black } from '../../settings/colors';

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
  min-height: 60vh;
`;

const Content = styled.div`
  width: 100%;
  display: inline-block;
  position: relative;
  max-width: 1024px;
  margin-top: -60px;
  z-index: 2;

  @media (min-width: 1024px) {
    margin-top: 0px;
    padding-top: 250px;
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

const EventImage = styled.img`
  width: 0;
  height: 0;
  visibility: hidden;
`;

const EventPage = ({ history }) => {
  const [loading, setLoading] = useState({ ...initialLoading });
  const [event, setEvent] = useState({ ...initialEvent });

  console.log(history);
  useEffect(() => {
    if (loading.event === loadingStatus.TO_LOAD) {
      // fetchEventData(id);
    }
  });

  return (
    <Container>
      <Header
        name="Fulana Ciclana"
        avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
      />
      <CoverWrapper>
        <Cover cover={event.cover}>
          <EventImage src={event.cover} alt="Cover do Evento" />
          <HeaderWrapper />
        </Cover>
      </CoverWrapper>
      <Content>
        <EventInfo

        />
        <ColumnWrapper>
          <EventText />
          <EventConditions />
          <ProductorCardWrapper>
            <ProductorCard />
          </ProductorCardWrapper>
          <SubscribedArtists artists={DUMMY_ARTISTS} />
        </ColumnWrapper>
      </Content>
      <Subscribed />
      <Dialog
        title="Cadastro incompleto :("
        description="Pra se inscrever em eventos você precisa preencher os dados obrigatórios."
        agreeText="Cadastrar"
        disagreeText="Voltar"
        confirmAction={() => null}
        disagreeAction={() => null}
      />
    </Container>
  );
};

export default withRouter(EventPage);
