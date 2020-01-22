import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import { black, white } from '../../../settings/colors';

const Wrapper = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${white};
  color: ${black};

  @media (min-width: 1024px) {
    background-color: transparent;
    color: ${white};
    padding-right: 45px;
    padding-left: 45px;
  }
`;

const Card = styled.div`
  display: inline-block;
  width: 20%;
  text-align: center;
  cursor: pointer;

  & + & {
    margin-left: 15px;
  }

  @media (min-width: 1024px) {
    width: calc(20% - 20px);

    & + & {
      margin-left: 20px;
    }
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 0;
`;

const Title = styled.h3`
  font-weight: 400;
  line-height: 1em;
  text-align: left;
  margin-bottom: 20px;
`;

const avatarCustomStyle = `
  width: 67px;
  height: 67px;
`;

const ArtistName = styled.h4`
  font-size: 0.8571428571em;
  font-weight: 300;
  margin-top: 10px;
  overflow: hidden;
`;

function renderArtists(artists, history) {
  return artists.map(art => (
    <Card onClick={() => history.push(`/artist/${art.id}`)}>
      <Avatar src={art.avatar_image.mimified} customStyle={avatarCustomStyle} />
      <ArtistName>{art.name}</ArtistName>
    </Card>
  ));
}

function MoreArtist({ artists, history }) {
  return (
    <Wrapper>
      <Title>Bandas Relacionadas</Title>
      <ListWrapper>{renderArtists(artists, history)}</ListWrapper>
    </Wrapper>
  );
}

const artistShape = {
  avatar_image: PropTypes.object,
  name: PropTypes.string,
};

MoreArtist.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape(artistShape)),
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
};

MoreArtist.defaultProps = {
  artists: [],
  history: {},
};

export default MoreArtist;
