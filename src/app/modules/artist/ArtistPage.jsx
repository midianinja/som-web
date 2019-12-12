import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { black } from '../../settings/colors';
import ArtistBasicInfo from '../../components/templates/artist/ArtistBasicInfo';
import AudioPlayer from '../../components/organisms/AudioPlayer';
import MoreArtist from '../../components/templates/artist/MoreArtist';
import Cover from '../../components/atoms/Cover';
import Header from '../../components/organisms/Header';
import InstagramMedia from '../../components/molecules/InstagramMedias';
import Store from '../../store/Store';
import {
  fetchArtistData, fetchArtistInstaImages,
  fetchRelatedArtsts, follow, unfollow,
} from './ArtistController';
import DialogModal from '../../components/modals/Dialog.modal';

const ArtistWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  background-color: ${black};
  color: white;
  text-align: center;

  @media (min-width: 1024px) {
    padding-bottom: 30px;
  }
`;

const CoverWrapper = styled.div`
  position: absolute;
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
  padding-top: 64px;
  position: relative;
  max-width: 1024px;

  @media (min-width: 1024px) {
    padding-top: 150px;
    display: inline-flex;
    justify-content: space-between;
  }
`;

const ColumnWrapper = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: top;

  @media (min-width: 1024px) {
    max-width: calc(100% - 454px);
  }
`;

function ArtistPage({ match, history }) {
  const { state, dispatch } = useContext(Store);
  const [artistLoading, setArtistLoading] = useState(false);
  // const [instagramPhotoLoading, setInstagramPhotoLoading] = useState(false);
  const [artist, setArtist] = useState({});
  const [relatedArtsts, setRelatedArtsts] = useState([]);
  const [instagramPhotos, setInstagramPhotos] = useState(false);
  const [follows, setFollows] = useState([]);
  const [alertModal, setAlertModal] = useState({
    title: '',
    icon: '',
    description: '',
    agreeText: '',
    disagreeText: '',
    confirmAction: '',
    disagreeAction: '',
    isOpen: false,
  });
  const [songs, setSongs] = useState([]);

  const { id } = match.params;
  console.log('id:', id);
  useEffect(() => {
    if (id !== artist.id) {
      const fetchArtist = async () => {
        await fetchArtistData(id, setArtist, setArtistLoading, setSongs, setAlertModal);
      };
      fetchArtist();
    }
  }, [match.params]);
  console.log('relatedArtsts:', relatedArtsts);

  useEffect(() => {
    if (artist.instagram) {
      fetchArtistInstaImages(artist.instagram, setInstagramPhotos);
    }
    if (!relatedArtsts.length) {
      fetchRelatedArtsts(artist, setRelatedArtsts);
    }

    if (artist.follows) {
      setFollows(artist.follows.map(({ user }) => user.id));
    }
  }, [artist]);

  if (artistLoading) return null;
  if (!artist.id) return null;

  const handleFollow = () => {
    if (!state.user) {
      dispatch({
        type: 'SHOW_LOGIN_MODAL',
        data: { redirect: false },
      });

      dispatch({
        type: 'SET_MODAL_LOGIN',
        status: true,
      });
    } else if (state.user && follows.indexOf(state.user.id) !== -1) {
      unfollow(artist.id, state.user.id, setFollows, follows);
    } else {
      follow(artist.id, state.user.id, setFollows, follows);
    }
  };

  if (alertModal.isOpen) {
    return (
      <DialogModal
        title={alertModal.title}
        description={alertModal.description}
        agreeText={alertModal.agreeText}
        disagreeText={alertModal.disagreeText}
        confirmAction={alertModal.confirmAction}
        disagreeAction={alertModal.disagreeAction}
        isOpen={alertModal.isOpen}
      />
    );
  }

  return (
    <ArtistWrapper>
      <Header />
      <CoverWrapper>
        <Cover cover={artist.cover}>
          <HeaderWrapper />
        </Cover>
      </CoverWrapper>
      <Content>
        <ArtistBasicInfo
          avatar={artist.avatar_image ? artist.avatar_image.mimified : null}
          about={artist.about}
          name={artist.name}
          facebook={artist.facebook}
          twitter={artist.twitter}
          spotify={artist.spotify_artist_link}
          instagram={artist.instagram}
          followers={follows.length}
          following={0}
          isFollowing={
            state.user && artist.follows
              ? follows.indexOf(state.user.id) !== -1
              : false
          }
          followToggle={handleFollow}
        />
        <ColumnWrapper>
          {
            songs.length ? <AudioPlayer tracks={songs} /> : null
          }
          <InstagramMedia
            images={instagramPhotos}
            navigateToInstagram={() => {
              if (artist.instagram) {
                window.open(artist.instagram, '_blank');
              }
            }}
          />
          {/* {
            artist.spotify_artist_link ? (
              <iframe
                src={artist.spotify_artist_link}
                width="100%"
                height="200px"
                title="spotify"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
              />
            ) : (
              null
            )
          } */}
          <MoreArtist history={history} artists={relatedArtsts} />
        </ColumnWrapper>
      </Content>
    </ArtistWrapper>
  );
}

const paramsShape = {
  id: PropTypes.string,
};

const matchShape = {
  params: PropTypes.shape(paramsShape).isRequired,
};

ArtistPage.propTypes = {
  match: PropTypes.shape(matchShape).isRequired,
};

export default withRouter(ArtistPage);
