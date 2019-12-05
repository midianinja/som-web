import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import { white, secondaryBlack, orange } from '../../../settings/colors';

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
  position: relative;
  display: inline-flex;
  vertical-align: top;
  flex-direction: column;
  align-items: center;
  width: 110px;
  padding: 15px 12px;
  background-color: ${secondaryBlack};
  border-radius: 15px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  @media (min-width: 1024px) {
    padding: 15px 7px;
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
    width: 70px;
    height: 70px;
  }
`;

const ArtistNameWrapper = styled.h4`
  display: flex;
  height: 25px;
  align-items: center;
`;

const ArtistName = styled.h4`
  display: -webkit-box;
  width: 100%;
  align-items: center;
  text-align: center;
  font-size: 0.6875em;
  line-height: 1.1em;
  font-weight: 400;
  margin-top: 10px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 25px;
`;

const ApprovedTag = styled.label`
  display: ${(props) => {
    const { show } = props;
    return show ? 'block' : 'none';
  }}
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: ${orange};
  color: ${white};
  font-size: 0.625em;
  padding: 7px 5px;
  font-weight: 200;
  letter-spacing: 2px;
  z-index: 2;
`;

function renderArtists(artists, artistClick, approveds) {
  const sortedArtists = artists.sort((artist) => {
    const { id } = artist;
    return approveds.findIndex(approved => approved.id === id) !== -1 ? -1 : 1;
  });

  return sortedArtists.map((artist) => {
    const src = artist && artist.avatar_image ? artist.avatar_image.mimified : '';
    return (
      <Card onClick={() => artistClick(artist.id)}>
        <ApprovedTag show={approveds.findIndex(({ id }) => artist.id === id) !== -1}>SELECIONADO</ApprovedTag>
        <Avatar src={src} customStyle={avatarCustomStyle} />
        <ArtistNameWrapper>
          <ArtistName>{artist.name}</ArtistName>
        </ArtistNameWrapper>
      </Card>
    );
  });
}

function SubscribedArtists({ artists, artistClick, approveds }) {
  return (
    <Wrapper>
      <Title>Artistas Inscritos</Title>
      <ListWrapper>{renderArtists(artists, artistClick, approveds)}</ListWrapper>
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

const approvedsShape = {
  _id: PropTypes.string.isRequired,
};

SubscribedArtists.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape(artistShape)),
  artistClick: PropTypes.func.isRequired,
  approveds: PropTypes.arrayOf(PropTypes.shape(approvedsShape)),
};

SubscribedArtists.defaultProps = {
  artists: [],
  approveds: [],
};

export default SubscribedArtists;
