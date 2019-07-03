import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';
import ArtistBasicInfo from '../components/templates/artist/ArtistBasicInfo';
import AudioPlayer from '../components/organisms/AudioPlayer';
import MoreArtist from '../components/templates/artist/MoreArtist';
import Cover from '../components/atoms/Cover';
import Header from '../components/organisms/Header';
import InstagramMedia from '../components/molecules/InstagramMedias';
import { fetchArtistData, fetchArtistInsta } from './artist/ArtistController';

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

const DUMMY_ARTISTS = [
  {
    avatar: 'https://correioderondonia.com/wp-content/uploads/2018/12/Amy-Winehouse.jpg',
    name: 'Amy',
  },
  {
    avatar: 'https://statig0.akamaized.net/bancodeimagens/4f/xo/s2/4fxos2kg7q78ghtzkkbag7s2d.jpg',
    name: 'Pink Floyd',
  },
  {
    avatar: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/0/e/a/a/0eaa830937157f7cdb325f0591a56fd5.jpg',
    name: 'Led Zeppelin',
  },
  {
    avatar: 'https://followthecolours.com.br/wp-content/uploads/2016/06/follow-the-colours-the-beatles-experience-exposicao-sao-paulo-02.jpg',
    name: 'Beatles',
  },
  {
    avatar: 'https://cdns-images.dzcdn.net/images/artist/45227e89713b0c240f00c4ab33cadf2d/500x500.jpg',
    name: 'Raul Seixas',
  },
];

function ArtistPage({ id }) {
  const [ headerLoading, setHeaderLoading ] = useState(false);
  const [ instaLoading, setInstagramLoading ] = useState(false);
  const [ artistName, setArtistName ] = useState('');
  const [ instaUsername, setInstaUsername ] = useState(null);
  const [ artistHeaderInfo, setHeaderInfo ] = useState(artistObj);
  const [ instaPics, setInstaPics ] = useState([]);

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
      />
      <CoverWrapper>
        <Cover cover={artistHeaderInfo.cover}>
          <HeaderWrapper />
        </Cover>
      </CoverWrapper>
      <Content>
        <ArtistBasicInfo
          avatar={artistHeaderInfo.avatar}
          about={artistHeaderInfo.about}
          name={artistName}
          followers={artistHeaderInfo.fs}
          following={artistHeaderInfo.fg}
          isFollowing={artistHeaderInfo.isFollowing}
        />
        <ColumnWrapper>
          <AudioPlayer />
          <InstagramMedia images={instaPics} />
          <MoreArtist artists={DUMMY_ARTISTS} />
        </ColumnWrapper>
      </Content> 
    </ArtistWrapper>
  );
}

export default ArtistPage;
