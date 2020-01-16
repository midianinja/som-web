import React, { useState, useEffect, useContext } from 'react';
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
  fetchEventsData, initialLoading, subscribeAction,
  unsubscribeAction,
} from './EventsController';
import { black } from '../../settings/colors';

const Container = styled.div`
  background-color: ${black};
  width: 100%;
  text-align: center;
  padding: 10px 0;
`;
const Title = styled.h2`
  color: #FFF;
  padding-bottom: 20px;
`;
const EventContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
  border: 1px solid #FFF;
  cursor: pointer;
  margin: 2px 0;
`;
const EventTitle = styled.p`
  color: #FFF;
  font-size: 1em;
`;

const EventPage = ({ match, history }) => {
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState({ ...initialLoading });
  const [events, setEvents] = useState([]);
  const [dialog, setDialog] = useState(null);
  console.log('dispatch:', dispatch);
  console.log('state:', state);
  console.log('events:', events);
  useEffect(() => {
    fetchEventsData(
      setEvents, loading, setLoading, setDialog, history,
    );
  }, []);
  return (
    <Store.Consumer>
      {({ state, dispatch }) => (
        <Container>
          <Header
            logged={!!state.user}
          />
          {
            events.map(evt => (
              <EventContainer onClick={() => (history.push(`/event/${evt.id}`))}>
                <EventTitle>
                  {evt.name}
                </EventTitle>
              </EventContainer>
            ))
          }
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
