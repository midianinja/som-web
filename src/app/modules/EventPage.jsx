import React from 'react';
import styled from 'styled-components';
import Cover from '../components/atoms/Cover';
import EventText from '../components/atoms/EventText';
import EventInfo from '../components/molecules/EventInfo';
import EventConditions from '../components/molecules/EventConditions';
import ProductorCard from '../components/molecules/ProductorCard';
import Header from '../components/organisms/Header';
import SubscribedArtists from '../components/templates/event/SubscribedArtists';
import Subscribed from '../components/modals/Subscribed';
import Dialog from '../components/modals/Dialog.modal';
import { black } from '../settings/colors';

const DUMMY_ARTISTS = [
  {
    avatar: 'https://correioderondonia.com/wp-content/uploads/2018/12/Amy-Winehouse.jpg',
    name: 'Amy',
  },
  {
    avatar: 'https://statig0.akamaized.net/bancodeimagens/4f/xo/s2/4fxos2kg7q78ghtzkkbag7s2d.jpg',
    name: 'Pink Floyd',
  },
  {
    avatar: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/0/e/a/a/0eaa830937157f7cdb325f0591a56fd5.jpg',
    name: 'Led Zeppelin',
  },
  {
    avatar: 'https://followthecolours.com.br/wp-content/uploads/2016/06/follow-the-colours-the-beatles-experience-exposicao-sao-paulo-02.jpg',
    name: 'Beatles',
  },
  {
    avatar: 'https://cdns-images.dzcdn.net/images/artist/45227e89713b0c240f00c4ab33cadf2d/500x500.jpg',
    name: 'Raul Seixas',
  },
  {
    avatar: 'https://correioderondonia.com/wp-content/uploads/2018/12/Amy-Winehouse.jpg',
    name: 'Amy',
  },
  {
    avatar: 'https://statig0.akamaized.net/bancodeimagens/4f/xo/s2/4fxos2kg7q78ghtzkkbag7s2d.jpg',
    name: 'Pink Floyd',
  },
  {
    avatar: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/0/e/a/a/0eaa830937157f7cdb325f0591a56fd5.jpg',
    name: 'Led Zeppelin',
  },
  {
    avatar: 'https://followthecolours.com.br/wp-content/uploads/2016/06/follow-the-colours-the-beatles-experience-exposicao-sao-paulo-02.jpg',
    name: 'Beatles',
  },
  {
    avatar: 'https://cdns-images.dzcdn.net/images/artist/45227e89713b0c240f00c4ab33cadf2d/500x500.jpg',
    name: 'Raul Seixas',
  },
];

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

export default EventPage;
