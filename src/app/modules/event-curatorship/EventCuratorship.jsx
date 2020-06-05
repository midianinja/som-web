import React, { useState, useEffect, useContext } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  black, tertiaryBlack, secondaryBlack, white,
  white50, purple, green, red,
} from '../../settings/colors';
import Store from '../../store/Store';
import {
  getArtsts, approveArtist,
  reproveArtist, resetSubscriptionAction,
} from './eventCuratorshipController';
import ArtistCurationshipModal from '../../components/modals/artist-curationship/ArtistCurationship.modal';
import Header from '../../components/organisms/Header';
import Avatar from '../../components/atoms/Avatar.atom';

const CuratorshiptWrapper = styled.section`
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: ${black};
  color: white;
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Title = styled.h1`
  width: 100%
  max-width: 900px;
  font-size: 2em;
  line-height: 2em;
  padding-left: 200px;
  @media (max-width: 768px) {
    padding-left: 40px;
  }
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  max-height: 70vh;
  @media (max-width: 768px) {
    flex-direction: column;
    max-height: none;
    height: auto;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  width: 258px;
  // align-items: center;
`;

const MenuOption = styled.a`
  padding: 7px 40px;
  color: white;
  cursor: pointer;
  ${props => (props.selected ? `color: ${purple};` : '')}
`;

const Table = styled.div`
  width: 100%;
`;

const Head = styled.div`
  display: flex;
  width: 100%;
`;

const HSmallCol = styled.div`
  font-weight: lighter;
  letter-spacing: 3px
  font-size: .6em;
  text-transform: uppercase;
  width: 30%;
  color: ${white50};
  text-align: center;
  background-color: transparent;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HBigCol = styled.div`
  font-weight: lighter;
  letter-spacing: 3px
  font-size: .6em;
  text-transform: uppercase;
  color: ${white50};
  text-align: center;
  width: 70%;
  background-color: transparent;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SmallCol = styled.div`
  width: 30%;
  padding: 10px 0;
  background-color: ${tertiaryBlack};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => (props.hover ? `background-color: ${secondaryBlack};` : '')}
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BigCol = styled.div`
  display: flex;
  width: 70%;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  ${props => (props.hover ? `background-color: ${black};` : '')}
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Body = styled.div`
  width: 100%;
  border-radius: 20px
  height: 100%;
  padding-bottom: 10px;
  max-height: calc(100vh - 94px);
  overflow-x: auto;
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    background-color: transparent;
    padding-left: 10px
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #5A5A5A;
  }
  @media (max-width: 768px) {
    border-radius: 0px;
    max-height: none;
  }
`;

const Line = styled.div`
  display: flex;
  background-color: ${secondaryBlack};
  width: 100%;
  margin: 1px 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px 0;
  }
`;

const Name = styled.label`
  color: ${white};
  font-size: .9em;
`;

const Profile = styled.label`
  color: ${white50};
  font-size: .6em;
  padding-left: 4px;
`;
const EventName = styled.label`
  color: ${white};
  font-size: .6em;
`;

const SubscriptionStatus = styled.div`
  ${props => (props.hidde ? 'display: none;' : '')}
  ${props => (props.approved === 'aprovada' ? `background-color: ${green}` : `background-color: ${red}`)}
  height: 60px;
  position: absolute;
  width: 60px;
  top: -30px;
  right: -30px;
  transform: rotate(45deg);
  @media (min-width: 769px) {
    width: auto;
    height: auto;
    transform: rotate(0deg);
    top: auto;
    right: auto;
    position: relative;
    background-color: transparent;
  }
`;

const ArtistiInfos = styled.div`
  display: flex;
  align-items: center;
`;

const SubscriptionLabel = styled.label`
  font-size: .8em;
  color: ${white50};
  @media (max-width: 768px) {
    display: none;
  }
`;

const renderArtistLines = ({
  artists, setHover,
  setArtist, hover,
}) => artists.map(art => (
  <Line
    key={art.uniqueId}
    hover={hover === art.id}
    onClick={() => setArtist(art)}
    onMouseEnter={() => setHover(art.id)}
    onMouseLeave={() => setHover('')}
  >
    <BigCol hover={hover === art.id}>
      <ArtistiInfos>
        <Avatar
          customStyle={`
            max-width: 42px;
            max-height: 42px;
            margin-right: 10px;
          `}
          src={art.avatar.mimified}
        />
        <Name>{art.name}</Name>
        <Profile>artista</Profile>
      </ArtistiInfos>
      <SubscriptionStatus approved={art.approved} hidde={!art.approved}>
        <SubscriptionLabel>
          {art.approved}
        </SubscriptionLabel>
      </SubscriptionStatus>
    </BigCol>
    <SmallCol hover={hover === art.id}>
      <EventName>
        {art.event.name}
      </EventName>
    </SmallCol>
  </Line>
));

function EventCuratorshipPage() {
  const [menu, setMenu] = useState('open');
  const [artists, setArtists] = useState([]);
  const [ratedArtists, setRatedArtists] = useState([]);
  const [hover, setHover] = useState('');
  const [artist, setArtist] = useState(null);
  const { state } = useContext(Store);
  useEffect(() => {
    if (state.user && state.user.productor) {
      getArtsts({ setArtists, productor: state.user.productor, setRatedArtists });
    }
  }, [state.user]);
  return (
    <CuratorshiptWrapper>
      <Header />
      <Title>Avaliar inscrições</Title>
      <Main>
        <Menu>
          <MenuOption
            selected={menu === 'open'}
            onClick={() => setMenu('open')}
          >
            Em Aberto
          </MenuOption>
          <MenuOption
            selected={menu === 'admitted'}
            onClick={() => setMenu('admitted')}
          >
            Já avaliados
          </MenuOption>
        </Menu>
        <Table>
          <Head>
            <HBigCol>
              Artista
            </HBigCol>
            <HSmallCol>
              Evento
            </HSmallCol>
          </Head>
          <Body>
            {renderArtistLines({
              artists: menu === 'open' ? artists : ratedArtists,
              setHover, setArtist,
              hover, menu,
            })}
          </Body>
        </Table>
      </Main>
      <ArtistCurationshipModal
        reproveAction={() => reproveArtist({
          artist, artists, ratedArtists,
          setArtists, setArtist, setRatedArtists,
        })}
        approveAction={() => approveArtist({
          artist, artists, ratedArtists,
          setArtists, setArtist, setRatedArtists,
        })}
        resetSubscriptionAction={() => resetSubscriptionAction({
          artist, artists, ratedArtists,
          setArtists, setArtist, setRatedArtists,
        })}
        artist={artist}
        closeModal={() => setArtist(null)}
      />
    </CuratorshiptWrapper>
  );
}

// const paramsShape = {
//   id: PropTypes.string,
// };

// const historyShape = {
//   push: PropTypes.func.isRequired,
// };

// const matchShape = {
//   params: PropTypes.shape(paramsShape).isRequired,
// };

EventCuratorshipPage.propTypes = {
  // history: PropTypes.shape(historyShape).isRequired,
  // match: PropTypes.shape(matchShape).isRequired,
};

export default EventCuratorshipPage;
