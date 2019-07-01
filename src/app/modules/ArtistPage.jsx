import React from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';
import ArtistBasicInfo from '../components/templates/artist/ArtistBasicInfo';
import AudioPlayer from '../components/organisms/AudioPlayer';
import MoreArtist from '../components/templates/artist/MoreArtist';
import Cover from '../components/atoms/Cover';
import Header from '../components/organisms/Header';
import InstagramMedia from '../components/molecules/InstagramMedias';

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
    margin-left: 30px;
  }
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

function ArtistPage() {
  return (
    <ArtistWrapper>
      <CoverWrapper>
        <Cover cover="/images/temp-cover.jpg">
          <HeaderWrapper>
            <Header
              name="Fulana Ciclana"
              avatar="https://api.adorable.io/avatars/285/abott@adorable.png"
            />
          </HeaderWrapper>
        </Cover>
      </CoverWrapper>
      <Content>
        <ArtistBasicInfo
          name="Supervão"
          avatar="/images/temp-avatar.jpeg"
          about="Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Mé faiz elementum girarzis, nisi eros vermeio. Nec orci ornare consequat."
          followers={234}
          following={10}
          isFollowing={false}
        />
        <ColumnWrapper>
          <AudioPlayer />
          <InstagramMedia images={images} />
          <MoreArtist artists={DUMMY_ARTISTS} />
        </ColumnWrapper>
      </Content>
    </ArtistWrapper>
  );
}

export default ArtistPage;
