import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import { white, secondaryBlack } from '../../../settings/colors';

const Wrapper = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
  color: ${white};
  position: relative;
  z-index: 2;

  // :before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   background: linear-gradient(270deg, #000000 17.5%, rgba(0, 0, 0, 0) 100%);
  //   width: 200px;
  //   height: 100%;
  //   top: 0;
  //   right: 0;
  //   z-index: 1;
  // }
`;

const Card = styled.div`
  display: inline-flex;
  vertical-align: top;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 100px;
  background-color: ${secondaryBlack};
  border-radius: 15px;
  text-align: center;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  @media (min-width: 1024px) {
    padding: 15px 60px;
  }
`;

// const Space = styled.div`
//   display: inline-flex;
//   vertical-align: top;
//   width: 100px;
//   padding: 20px;
//   border-radius: 15px;
//   text-align: center;
//   cursor: pointer;
// `;

const ListWrapper = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Title = styled.h3`
  font-weight: 400;
  line-height: 1em;
  font-size: 1em;
  text-align: left;
  margin-bottom: 20px;
`;

const avatarCustomStyle = `
  width: 60px;
  height: 60px;

  @media (min-width: 1024px) {
    width: 80px;
    height: 80px;
  }
`;

const ArtistName = styled.h4`
  display: flex;
  height: 30px;
  align-items: center;
  text-align: center;
  font-size: 0.7142857143em;
  font-weight: 400;
  margin-top: 10px;
  white-space: normal;
`;

function renderArtists(artists) {
  return artists.map((artist) => {
    console.log('artist:', artist);
    const src = artist && artist.avatar_image ? artist.avatar_image.mimified : '';
    return (
      <Card>
        <Avatar src={src} customStyle={avatarCustomStyle} />
        <ArtistName>{artist.name}</ArtistName>
      </Card>
    );
  });
}

function SubscribedArtists({ artists }) {
  return (
    <Wrapper>
      <Title>Artistas Inscritos</Title>
      <ListWrapper>{renderArtists(artists)}</ListWrapper>
    </Wrapper>
  );
}

const imageShape = {
  mimified: PropTypes.string,
};

const artistShape = {
  avatar_image: PropTypes.shape(imageShape),
  name: PropTypes.string,
};

SubscribedArtists.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape(artistShape)),
};

SubscribedArtists.defaultProps = {
  artists: [],
};

export default SubscribedArtists;
