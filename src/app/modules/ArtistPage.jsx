import React from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';
import ArtistBasicInfo from '../components/templates/artist/ArtistBasicInfo';
import AudioPlayer from '../components/organisms/AudioPlayer';
import Cover from '../components/atoms/Cover';
import Header from '../components/organisms/Header';
import InstagramMedia from '../components/molecules/InstagramMedias';

const ArtistWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  padding-bottom: 30px;
  background-color: ${black};
  color: white;
  text-align: center;
`;

const CoverWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 0;
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

function ArtistPage() {
  return (
    <ArtistWrapper>
      <CoverWrapper>
        <Cover cover="/images/temp-cover.jpg">
          <HeaderWrapper />
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
        </ColumnWrapper>
      </Content>
    </ArtistWrapper>
  );
}

export default ArtistPage;
