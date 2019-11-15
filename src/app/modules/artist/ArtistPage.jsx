import React, { useState, useEffect } from 'react';
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
import { fetchArtistData, fetchArtistInstaImages } from './ArtistController';

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

function ArtistPage({ match }) {
  const [artistLoading, setArtistLoading] = useState(false);
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);

  const { id } = match.params;
  useEffect(() => {
    const fetchArtist = async () => {
      await fetchArtistData(id, setArtist, setArtistLoading, setSongs);
    };
    fetchArtist();
  }, []);

  if (artistLoading) return null;
  if (!artist.id) return null;

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
          instagram={artist.instagram}
          followers={0}
          following={0}
          isFollowing={false}
        />
        <ColumnWrapper>
          <AudioPlayer tracks={songs} />
          <InstagramMedia images={[]} />
          <MoreArtist artists={[]} />
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
