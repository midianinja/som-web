import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import EventCard from './organisms/eventCard.organism';
import Header from '../../components/organisms/Header';
import Dialog from '../../components/modals/Dialog.modal';
import {
  fetchEventsData, initialLoading,
  fetchLocations, fetchMusicalStyleOptions,
  handleMusicalStyleSelect, removeTagAction,
} from './EventsController';
import InputGroup from '../../components/molecules/InputGroup';
// import Input from '../../components/atoms/Input';
import TagList from '../../components/molecules/TagList';
import ListInput from '../../components/molecules/ListInput.molecule';
import { /* white10, */ black/* , white */ } from '../../settings/colors';
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

const Form = styled.div`
  width: 100%;
  max-width: 1024px;
  text-align: left;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const LocationLabel = styled.label`
  color: #FFF;
  font-size: 1em;
  margin-right: 5px;
`;
const LocationValue = styled.label`
  color: #51DBA9;
  font-size: 1.1em;
`;

// const InputIconWrapper = styled.div`
//   display: flex;
//   height: 38px;
//   color: ${white};
//   background-color: ${white10};
//   border-radius: 38px;
//   padding-left: 15px;
//   padding-right: 15px;
// `;

// const SearchIcon = styled.img`
//   width: 20px
// `;

const EventsContainer = styled.section`
  background-color: ${black};
  width: 100%;
  text-align: center;
  margin-top: 50px;
  padding: 10px 0;
  max-width: 1024px;
`;

// const searchStyle = `
//   width: 200px;
//   text-align: left;
//   margin-bottom: 0;
//   @media (max-width: 768px) {
//     width: auto;
//   }
// `;

// const searchInputStyle = `
//   background-color: transparent;

//   @media (max-width: 768px) {
//     display: none
//   }
// `;

const filterGroupsStyle = `
  margin-right: 10px;
  max-width: 240px;
  display: inline-block;
  vertical-align: top;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const tagListStyle = `
  width: 100%;
  text-align: left;
`;

const YEARS_MODEL = [
  { name: '2019', id: '2019' },
  { name: '2020', id: '2020' },
  { name: '2021', id: '2021' },
  { name: '2022', id: '2022' },
  { name: '2023', id: '2023' },
  { name: '2024', id: '2024' },
  { name: '2025', id: '2025' },
  { name: '2026', id: '2026' },
  { name: '2027', id: '2027' },
  { name: '2028', id: '2028' },
  { name: '2029', id: '2029' },
];

const MONTH_MODEL = [
  { name: 'Janeiro', id: '0' },
  { name: 'Fevereiro', id: '1' },
  { name: 'Março', id: '2' },
  { name: 'Abril', id: '3' },
  { name: 'Maio', id: '4' },
  { name: 'Junho', id: '5' },
  { name: 'Julho', id: '6' },
  { name: 'Agosto', id: '7' },
  { name: 'Outubro', id: '8' },
  { name: 'Setembro', id: '9' },
  { name: 'Novembro', id: '10' },
  { name: 'Dezembro', id: '11' },
];

const EventPage = ({ history }) => {
  const { state } = useContext(Store);
  const [loading, setLoading] = useState({ ...initialLoading });
  const [events, setEvents] = useState([]);
  const [dialog, setDialog] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  // const [hasSearch, setHasSearch] = useState(false);
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicStyles, setMusicStyles] = useState([]);
  const [years, setYears] = useState([
    {
      color: 'green',
      text: `${new Date('2020T00:01').getFullYear()}`,
      id: `${new Date('2020T00:01').getFullYear()}`,
    },
  ]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    fetchEventsData({
      setEvents, loading, setLoading,
      setDialog, history, musicStyles,
      years, months,
    });
    if (!countries.length && !states.length) {
      fetchLocations({ setCountries, setStates });
      fetchMusicalStyleOptions(setMusicalStylesOptions);
    }
  }, [musicStyles, years, months]);
  return (
    <Container>
      <Header
        logged={!!state.user}
      />
      <GlobalForm>
        <LocationContainer>
          <LocationLabel>Eventos em</LocationLabel>
          <LocationValue>São paulo</LocationValue>
        </LocationContainer>
        {/* <InputGroup customStyle={searchStyle}>
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
        </InputGroup> */}
      </GlobalForm>
      <Form>
        <InputGroup
          customStyle={filterGroupsStyle}
        >
          <ListInput
            id="musical_style"
            placeholder="Estilo de música"
            options={musicalStylesOptions.map(op => ({
              label: op.name,
              id: op.id,
            }))}
            onSelect={data => handleMusicalStyleSelect({
              data, musicStyles,
              setMusicStyles, musicalStylesOptions,
            })}
          />
        </InputGroup>
        <InputGroup
          customStyle={filterGroupsStyle}
        >
          <ListInput
            id="year"
            placeholder="Ano"
            options={YEARS_MODEL.map(op => ({
              label: op.name,
              id: op.id,
            }))}
            onSelect={data => handleMusicalStyleSelect({
              data, musicStyles: years,
              setMusicStyles: setYears,
              musicalStylesOptions: YEARS_MODEL,
            })}
          />
        </InputGroup>
        <InputGroup
          customStyle={filterGroupsStyle}
        >
          <ListInput
            id="month"
            placeholder="Mês"
            options={MONTH_MODEL.map(op => ({
              label: op.name,
              id: op.id,
            }))}
            onSelect={data => handleMusicalStyleSelect({
              data,
              musicStyles: months,
              setMusicStyles: setMonths,
              musicalStylesOptions: MONTH_MODEL,
            })}
          />
        </InputGroup>
        <div>
          <TagList
            handleClose={data => removeTagAction({
              data, YEARS_MODEL, MONTH_MODEL,
              musicalStylesOptions, musicStyles,
              years, months, setMusicStyles,
              setYears, setMonths,
            })}
            data={musicStyles.concat(years).concat(months)}
            customStyle={tagListStyle}
          />
        </div>
      </Form>
      <EventsContainer>
        {
          events.map(evt => (
            <EventCard
              loggedAs={state.connectionType}
              customStyle="margin-bottom: 90px;"
              user={state.user}
              event={evt}
              onClick={() => history.push(`/event/${evt.id}`)}
            />
          ))
        }
      </EventsContainer>
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

// const routerParamsShape = {
//   id: PropTypes.string,
// };

const routerHistoryShape = {
  push: PropTypes.function,
};

EventPage.propTypes = {
  // match: PropTypes.shape(routerParamsShape).isRequired,
  history: PropTypes.shape(routerHistoryShape).isRequired,
};

export default withRouter(EventPage);
