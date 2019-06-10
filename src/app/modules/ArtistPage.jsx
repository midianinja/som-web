import React from 'react';
import styled from 'styled-components';
import { black } from '../settings/colors';
import Header from '../components/templates/artist/Header';
import AudioPlayer from '../components/organisms/AudioPlayer';
import InstagramMedia from '../components/molecules/InstagramMedias';

const ArtistWrapper = styled.div`
  width: 100%;
  min-height: 150vh;
  padding-bottom: 30px;
  background-color: ${black};
  color: white;
  text-align: center;
`;

function ArtistPage() {
  return (
    <ArtistWrapper>
      <Header
        name="Criolo"
        avatar="https://f001.backblazeb2.com/file/heloisatolipan/imagens/2016/04/12973601_1099945353403569_5156213399083618245_o.jpg"
        about="Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Mé faiz elementum girarzis, nisi eros vermeio. Nec orci ornare consequat."
        followers={234}
        following={10}
        cover="/images/temp-cover.png"
        isFollowing={false}
      />
      <AudioPlayer />
      <InstagramMedia />
    </ArtistWrapper>
  );
}

export default ArtistPage;
