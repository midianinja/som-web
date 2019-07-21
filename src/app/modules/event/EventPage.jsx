import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Cover from '../../components/atoms/Cover';
import EventText from '../../components/atoms/EventText';
import EventInfo from '../../components/molecules/EventInfo';
import EventConditions from '../../components/molecules/EventConditions';
import ProductorCard from '../../components/molecules/ProductorCard';
import Header from '../../components/organisms/Header';
import SubscribedArtists from '../../components/templates/event/SubscribedArtists';
import Dialog from '../../components/modals/Dialog.modal';
import Store from '../../store/Store';
import {
  fetchEventData, initialEvent, initialLoading, loadingStatus, subscribeAction,
  unsubscribeAction,
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
  padding-bottom: 20px;

  @media (min-width: 1024px) {
    padding-bottom: 40px;
  }
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

const EventPage = ({ match, history }) => {
  const [loading, setLoading] = useState({ ...initialLoading });
  const [event, setEvent] = useState({ ...initialEvent });
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    if (loading.event === loadingStatus.TO_LOAD) {
      fetchEventData(match.params.id, setEvent, loading, setLoading);
    }
  });

  const eventPlace = {
    city: event.location.city,
    state: event.location.state,
    district: event.location.district,
    address: `${event.location.address}, nº ${event.location.number}`,
  };

  const eventConditions = {
    has_local_transportation: event.has_local_transportation,
    has_accommodation: event.has_accommodation,
    has_food: event.has_food,
  };

  const isSubscribed = (u, e) => {
    let subscribed = false;
    if (u && u.artists.length > 0) {
      if (e.subscribers.find(({ id }) => u.artists[0].id === id)) {
        subscribed = true;
      }
    }
    return subscribed;
  };

  return (
    <Store.Consumer>
      {({ state, dispatch }) => (
        <Container>
          <Header />
          <CoverWrapper>
            <Cover cover={event.cover}>
              <EventImage src={event.cover} alt="Cover do Evento" />
              <HeaderWrapper />
            </Cover>
          </CoverWrapper>
          <Content>
            <EventInfo
              subscribed={isSubscribed(state.user, event)}
              name={event.name}
              date={event.event_date}
              place={eventPlace}
              subscribers={event.subscribers.length}
              subscribeAction={() => subscribeAction(
                state.auth, state.user, event, dispatch, setDialog,
                setEvent, history, event,
              )}
              unsubscribeAction={() => unsubscribeAction(state.user, event, setEvent)}
            />
            <ColumnWrapper>
              <EventText text={event.about} />
              <EventConditions conditions={eventConditions} />
              <ProductorCardWrapper>
                <ProductorCard productor={event.productor} />
              </ProductorCardWrapper>
              <SubscribedArtists artists={event.subscribers} />
            </ColumnWrapper>
          </Content>
          {dialog ? (
            <Dialog
              isOpen
              title={dialog.title}
              description={dialog.description}
              agreeText={dialog.agreeText}
              disagreeText={dialog.disagreeText}
              confirmAction={dialog.confirmAction}
              disagreeAction={dialog.disagreeAction}
            />
          ) : null}
        </Container>
      )}
    </Store.Consumer>
  );
};

const routerParamsShape = {
  id: PropTypes.string,
};

const routerHistoryShape = {
  push: PropTypes.function,
};

EventPage.propTypes = {
  match: PropTypes.shape(routerParamsShape).isRequired,
  history: PropTypes.shape(routerHistoryShape).isRequired,
};

export default withRouter(EventPage);
