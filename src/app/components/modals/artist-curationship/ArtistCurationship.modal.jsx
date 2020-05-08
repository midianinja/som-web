import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// import qs from 'query-string';
import {
  black50, white, purple,
  purple15, purple50, black, green, red, gray04,
} from '../../../settings/colors';
// import { blockBodyScroll, allowBodyScroll } from '../../../utilities/scroll';
import Cover from '../../atoms/Cover';
import { fetchSongs } from './ArtistCurationship.controller';
import AudioPlayer from '../../organisms/AudioPlayer';
import PrimaryButton from '../../atoms/PrimaryButton';

const ArtistCurationshipModalWrapper = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 30;
  overflow: auto;
  background-color: ${black50};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const CloseIcon = styled.img`
  width: 30px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 120px;
  border-radius: 100%;
  @media (max-width: 768px) {
    width: 90px;
  }
`;

const ArtistWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const ArtistInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 290px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const ArtistName = styled.h2`
  font-size: 2.2em;
  line-height: 2.2em;
  color: ${white};
`;

const Label = styled.p`
  font-size: .8em;
  padding-top: 20px;
`;

const Empty = styled.p`
  color: ${gray04};
  padding: 20px;
  display: flex;
  justify-content: center;
  letter-spacing: 0.1em;
  align-items: center;
  font-size: 1em;
  @media (max-width: 768px) {
    height: 60vh;
  }

`;

const Bold = styled.label`
  font-weight: bold;
`;

const GreenBold = styled.label`
  font-weight: bold;
  color: ${green};
`;

const RedBold = styled.label`
  font-weight: bold;
  color: ${red};
`;

const ArtistDescription = styled.p`
  font-size: .7em;
  line-height: 1em;
  color: ${white};
  max-height: 20px;
  overflow: hidden;
  text-align: left;
  font-weight: 100;
`;

const ProfileLink = styled.a`
  font-size: .7em;
  line-height: 1em;
  padding-top: 32px;
  color: ${white};
  cursor: pointer;
`;

const CoverWrapper = styled.div`
  width: 100%;
  z-index: 0;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 10px;
  // text-align center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  text-align center;
  border-radius: 20px;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #000;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const WhiteZone = styled.div`
  width: 100%;
  text-align center;
  background-color: ${white};
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${black};
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
`;

const aprroveButtonStyle = `
  padding: 7px 21px;
  height: auto;
  background-color: ${green};
  margin: 0 7px;
`;

const reproveButtonStyle = `
  padding: 7px 21px;
  height: auto;
  background-color: ${red};
`;

const audioListStyle = `
  max-height: 122px;
  overflow-x: auto;
  @media (max-width: 768px) {
    padding-bottom: 100px;
    max-height: none;
  }
`;
const resetSubscriptionStyle = `
  margin-bottom: 10px
  height: 20px
  background-color: transparent;
  color: ${purple};
`;

const curatorAction = ({
  artist, approveAction, reproveAction,
}) => (
  <WhiteZone>
    <Label>
      <Bold>{`${artist.name} `}</Bold>
      se inscreveu em
      <Bold>{` ${artist.event.name} `}</Bold>
    </Label>
    <ButtonsWrapper>
      <PrimaryButton
        customStyle={aprroveButtonStyle}
        onClick={approveAction}
      >
        Aprovar
      </PrimaryButton>
      <PrimaryButton
        onClick={reproveAction}
        customStyle={reproveButtonStyle}
      >
        Reprovar
      </PrimaryButton>
    </ButtonsWrapper>
  </WhiteZone>
);
const resetRateAction = ({
  artist, resetSubscriptionAction,
}) => (
  <WhiteZone>
    <Label>
      Banda
      {
        artist.approved === 'aprovada'
          ? (<GreenBold>{' aprovada '}</GreenBold>)
          : (<RedBold>{' reprovada '}</RedBold>)
      }
      para o
      <Bold>{` ${artist.event.name} `}</Bold>
    </Label>
    <PrimaryButton
      onClick={resetSubscriptionAction}
      customStyle={resetSubscriptionStyle}
    >
      Reavaliar artista
    </PrimaryButton>
  </WhiteZone>
);

function ArtistCurationshipModal({
  artist, closeModal, resetSubscriptionAction,
  reproveAction, approveAction, history,
}) {
  const [songs, setSongs] = useState([]);
  const [playPress, setPlayPress] = useState('');
  useEffect(() => {
    if (artist) fetchSongs({ artist, setSongs });
  }, [artist]);

  if (!artist) return null;

  return (
    <ArtistCurationshipModalWrapper id="artists-curationship">
      <Container>
        <CoverWrapper>
          <Cover customStyle="padding: 0; height: 180px;" cover={artist.cover}>
            <HeaderWrapper>
              <CloseWrapper>
                <CloseIcon
                  onClick={() => {
                    setPlayPress(`${Math.random()}`);
                    setTimeout(closeModal, 200);
                  }}
                  src="/icons/close-white.svg"
                />
              </CloseWrapper>
              <ArtistWrapper>
                <ProfileImage src={artist.avatar.mimified} />
                <ArtistInfos>
                  <ArtistName>
                    {artist.name}
                  </ArtistName>
                  <ArtistDescription>
                    {artist.about}
                  </ArtistDescription>
                  <ProfileLink onClick={() => history.push(`/artist/${artist.id}`)}>Ver perfil completo</ProfileLink>
                </ArtistInfos>
              </ArtistWrapper>
            </HeaderWrapper>
          </Cover>
        </CoverWrapper>
        {
            songs.length ? (
              <AudioPlayer
                playPress={playPress}
                color={purple}
                color15={purple15}
                color50={purple50}
                customStyle="padding-top: 90px;"
                customListStyle={audioListStyle}
                tracks={artist ? songs : []}
              />
            ) : <Empty>Artista sem musicas</Empty>
          }
        {
          artist.approved
            ? resetRateAction({ artist, resetSubscriptionAction })
            : curatorAction({ artist, approveAction, reproveAction })
        }
      </Container>
    </ArtistCurationshipModalWrapper>
  );
}

const historyShape = {
  push: PropTypes.func,
};

const artistShape = {
  cover: PropTypes.object,
  about: PropTypes.string,
  approved: PropTypes.string,
};

curatorAction.propTypes = {
  artist: PropTypes.shape(artistShape).isRequired,
  reproveAction: PropTypes.func.isRequired,
  approveAction: PropTypes.func.isRequired,
};

resetRateAction.propTypes = {
  artist: PropTypes.shape(artistShape).isRequired,
  resetSubscriptionAction: PropTypes.func.isRequired,
};

ArtistCurationshipModal.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
  artist: PropTypes.shape(artistShape).isRequired,
  closeModal: PropTypes.func.isRequired,
  reproveAction: PropTypes.func.isRequired,
  approveAction: PropTypes.func.isRequired,
  resetSubscriptionAction: PropTypes.func.isRequired,
};

export default withRouter(ArtistCurationshipModal);
