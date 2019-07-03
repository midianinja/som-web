import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';
import Header from '../components/templates/artist/Header';
import AudioPlayer from '../components/organisms/AudioPlayer';
import InstagramMedia from '../components/molecules/InstagramMedias';
import { fetchArtistData, fetchArtistInsta } from './artist/ArtistController';

const ArtistWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  padding-bottom: 30px;
  background-color: ${black};
  color: white;
  text-align: center;
`;

const images = [
  '/images/0.png',
  '/images/1.jpg',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
];

const artistObj = {
  avatar: 'https://f001.backblazeb2.com/file/heloisatolipan/imagens/2016/04/12973601_1099945353403569_5156213399083618245_o.jpg',
  about: "jhsjh aksjhdaoieu a;ld ashsuhawi idhcc  suh i ihioh oi hihu i ihhlkj kh hjhiu lk jh. j hj klhlih a.",
  fs: 4,
  fg: 0,
  cover: '/images/temp-cover.png',
  isFollowing: false
}

const loadingComponents = {
  artistInfo: false,
  artistMedia: false,
  artistInsta: false
}

function ArtistPage({ id }) {
  const [ headerLoading, setHeaderLoading ] = useState(false);
  const [ instaLoading, setInstagramLoading ] = useState(false);
  const [ artistName, setArtistName ] = useState('nome do artista');
  const [ instaUsername, setInstaUsername ] = useState(null);
  const [ artistHeaderInfo, setHeaderInfo ] = useState(artistObj);
  const [ instaPics, setInstaPics ] = useState(images);

  useEffect(async id => {
    const fetchArtist = async () => {
      await fetchArtistData( id, setArtistName, setHeaderLoading, setInstaUsername);
      await fetchArtistInsta( 'fernandopvidigal', setInstaPics, setInstagramLoading);
    }
    fetchArtist();
  },[]);

  return (
    <ArtistWrapper>
      <Header
        name={artistName}
        avatar={artistHeaderInfo.avatar}
        about={artistHeaderInfo.about}
        followers={artistHeaderInfo.fs}
        following={artistHeaderInfo.fg}
        cover={artistHeaderInfo.cover}
        isFollowing={artistHeaderInfo.isFollowing}
      />
      <AudioPlayer />
      <InstagramMedia images={instaPics} />
    </ArtistWrapper>
  );
}

export default ArtistPage;
