import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import EventCard from './organisms/myEventCard.organism';
import Header from '../../components/organisms/Header';
import Dialog from '../../components/modals/Dialog.modal';
import {
  fetchEventsData, initialLoading,
} from './MyEventsController';
import InputGroup from '../../components/molecules/InputGroup';
import Input from '../../components/atoms/Input';
import {
  white10, black, white,
  tertiaryBlack,
} from '../../settings/colors';
import Store from '../../store/Store';

const Container = styled.div`
  background-color: ${black};
  width: 100%;
  text-align: center;
  margin-top: 78px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const GlobalForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputIconWrapper = styled.div`
  display: flex;
  height: 38px;
  color: ${white};
  background-color: ${white10};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SearchIcon = styled.img`
  width: 20px
`;

const EventsContainer = styled.section`
  background-color: ${black};
  width: 100%;
  text-align: center;
  margin-top: 50px;
  padding: 10px 0;
  max-width: 1024px;
`;

const searchStyle = `
  width: 200px;
  text-align: left;
  margin-bottom: 0;
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

const AddButton = styled.a`
  display: flex;
  padding: 15px 25px;
  font-size: .8em;
  color: ${white}
  background-color: ${tertiaryBlack};
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
`;

const searchInputStyle = `
  background-color: transparent;
`;

const MyEventsPage = ({ history }) => {
  const { state } = useContext(Store);
  const [loading, setLoading] = useState({ ...initialLoading });
  const [events, setEvents] = useState([]);
  const [dialog, setDialog] = useState({});

  useEffect(() => {
    if (state.user) {
      fetchEventsData({
        setEvents, loading, setLoading,
        setDialog, state, user: state.user,
      });
    }
  }, [state.user]);
  return (
    <Container>
      <Header
        logged={!!state.user}
      />
      <GlobalForm>
        <LocationContainer />
        <InputGroup customStyle={searchStyle}>
          <InputIconWrapper>
            <SearchIcon
              src="/icons/search.svg"
            />
            <Input
              id="keyword"
              placeholder="Buscar"
              value={undefined}
              customStyle={searchInputStyle}
              onBlur={() => console.log('onBlur')}
              onChange={() => console.log('onChange')}
            />
          </InputIconWrapper>
        </InputGroup>
      </GlobalForm>
      <EventsContainer>
        {
          events.map(evt => (
            <EventCard customStyle="margin-bottom: 90px;" user={state.user} event={evt} />
          ))
        }
      </EventsContainer>
      <AddButton onClick={() => history.push('/register-event')}>
        <Icon src="/icons/plus.svg" />
        Adicionar evento
      </AddButton>
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
    </Container>
  );
};

const routerHistoryShape = {
  push: PropTypes.function,
};

MyEventsPage.propTypes = {
  history: PropTypes.shape(routerHistoryShape).isRequired,
};

export default withRouter(MyEventsPage);
