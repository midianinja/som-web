import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
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
  fetchEventData, initialLoading, subscribeAction,
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
  margin-top: 51px;

  @media (min-width: 1024px) {
    top: 51px;
    position: fixed;
    margin-top: 0px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  min-height: 45vh;
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

const unixTime = unixtime => new Date(+unixtime).toISOString().slice(0, 19);

const EventPage = ({ match, history }) => {
  const [loading, setLoading] = useState({ ...initialLoading });
  const [event, setEvent] = useState(null);
  const [dialog, setDialog] = useState({});
  const { state: myState } = useContext(Store);

  useEffect(() => {
    fetchEventData(
      match.params.id, setEvent, loading, setLoading, setDialog, history,
    );
  }, []);

  if (!event) {
    return (
      <Container>
        {dialog.title ? (
          <Dialog
            isOpen
            title={dialog.title}
            icon={dialog.icon}
            description={dialog.description}
            agreeText={dialog.agreeText}
            disagreeText={dialog.disagreeText}
            confirmAction={dialog.confirmAction}
            disagreeAction={dialog.disagreeAction}
          />
        ) : null}
      </Container>
    );
  }

  const eventPlace = {
    city: event.location.city,
    state: event.location.state,
    district: event.location.district,
    address: `${event.location.address} ${event.location.number}`,
    complement: event.location.complement,
  };

  const eventConditions = {
    has_local_transportation: event.has_local_transportation,
    has_accommodation: event.has_accommodation,
    has_food: event.has_food,
    has_money_paid: event.has_money_paid,
  };

  const closingDateInstance = moment(new Date(unixTime(event.subscribe_closing_date)));
  const todayInstance = moment();

  const closingDiffDays = Math.floor(closingDateInstance.diff(todayInstance, 'days', true));
  const closingDiffHours = Math.ceil(closingDateInstance.diff(todayInstance, 'hours', true));

  const isClosingSubscribe = closingDiffDays <= 0 && closingDiffHours <= 0;
  const isSubscribed = (u, e) => {
    let subscribed = false;

    if (u && u.artist) {
      if (
        e.subscribers.find(({ id }) => u.artist.id === id)
        || e.approved_artists.find(({ id }) => u.artist.id === id)
      ) {
        subscribed = true;
      }
    }

    return subscribed;
  };

  return (
    <Store.Consumer>
      {({ state, dispatch }) => (
        <Container>
          <Header
            logged={!!state.user}
          />
          <CoverWrapper>
            <Cover cover={event.cover.mimified}>
              <EventImage src={event.cover.mimified} alt="Cover do Evento" />
              <HeaderWrapper />
            </Cover>
          </CoverWrapper>
          <Content>
            <EventInfo
              subscribed={isSubscribed(state.user, event)}
              name={event.name}
              date={event.event_date}
              place={eventPlace}
              isClosingSubscribe={isClosingSubscribe}
              diffDays={closingDiffDays}
              diffHours={closingDiffHours}
              loggedAs={myState.connectionType}
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
              <SubscribedArtists
                artistClick={artistId => history.push(`/artist/${artistId}`)}
                artists={event.subscribers}
                approveds={event.approved_artists}
              />
            </ColumnWrapper>
          </Content>
          {dialog.title ? (
            <Dialog
              closeAction={() => setDialog({})}
              isOpen
              title={dialog.title}
              icon={dialog.icon}
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
