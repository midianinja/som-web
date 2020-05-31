import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import Socials from '../../organisms/Socials';
import PrimaryButton from '../../atoms/PrimaryButton';
// import LinkButton from '../../atoms/LinkButton';
import {
  white, white30, purple, green,
} from '../../../settings/colors';

const Wrapper = styled.section`
  display: inline-block;
  width: 100%;
  max-width: 420px;
  padding-bottom: 40px;

  @media (min-width: 1024px) {
    position: sticky;
    top: 150px;
    align-self: flex-start;
    text-align: left;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  margin-top: 20px;
  padding-right: 40px;
  font-size: 2.1428571429em;
  font-weight: 400;
  line-height: 1.1em;

  @media (min-width: 1024px) {
    padding-left: 10px;
    padding-right: 0px;
    margin-top: 0;
    max-width: 200px;
  }
`;

const TitleAndFollowWrapper = styled.div`
  @media (min-width: 1024px) {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }
`;

const ConnectionsWrapper = styled.div``;

const buttonCustomStyled = `
  width: 150px;
  margin-right: 15px;
  vertical-align: middle;
`;

const EditIcon = styled.img`
  width: 15px;
  height: 15px;
  vertical-align: middle;
  margin-right: 5px;
`;

const followButtonCustomStyled = `
  width: 150px;
  margin-right: 15px;
  border: solid 1px ${purple};
  color: ${white};
  background-color: transparent;
  vertical-align: middle;
`;

const avatarCustomStyled = `
  width: 140px;
  height: 140px;
  vertical-align: middle;
`;

const FollowText = styled.label`
  color: ${white30};
  font-size: 0.8571428571em;
  font-weight: 300;
  padding: 10px;
`;

const FollowNumber = styled.span`
  margin-right: 10px;
  font-size: 1.3333333333em;
  color: ${white};
  vertical-align: middle;
`;

const About = styled.p`
  margin-bottom: 45px;
  margin-top: 45px;
  line-height: 2em;
  font-weight: 300;
  padding-right: 40px;
  text-align: left;
  font-size: 0.8571428571em;
  transition-duration: 0.2s;
  word-break: break-all;
`;

const ActionWrapper = styled.div`
  padding-right: 40px;
  text-align: left;
`;

const LerMoreBio = styled.span`
  color: ${green};
  cursor: pointer;
`;

function renderSubiscribeActions(isFollowing, followToggle) {
  return (
    <Fragment>
      {
        isFollowing ? (
          <PrimaryButton onClick={followToggle} customStyle={followButtonCustomStyled}>
            Deixar de seguir
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={followToggle} customStyle={buttonCustomStyled}>
            Seguir
          </PrimaryButton>
        )
      }
    </Fragment>
  );
}

function renderEditAction(onClick) {
  return (
    <PrimaryButton onClick={onClick} customStyle={followButtonCustomStyled}>
      <EditIcon src="/icons/edit-white.svg" />
      Editar
    </PrimaryButton>
  );
}

function ArtistBasicInfo(props) {
  const {
    name, avatar, followers, following,
    about, facebook, instagram, twitter,
    followToggle, isFollowing, spotify,
    isUserArtist, editAction,
  } = props;

  const [lerMoreBio, setLerMoreBio] = useState(false);

  return (
    <Wrapper id="infos">
      <Avatar customStyle={avatarCustomStyled} src={avatar} alt={name} />
      <TitleAndFollowWrapper>
        <Title>{name}</Title>
        <ConnectionsWrapper>
          <FollowText>
            <FollowNumber>{followers}</FollowNumber>
            seguidores
          </FollowText>
          <FollowText>
            <FollowNumber>{following}</FollowNumber>
            seguindo
          </FollowText>
        </ConnectionsWrapper>
      </TitleAndFollowWrapper>
      <About>
        {!lerMoreBio ? about.slice(0, 200) : about}
        {!lerMoreBio && about.length > 200 ? '...' : ''}
        &nbsp;
        {
          about.length > 200
            ? (
              <LerMoreBio
                onClick={() => setLerMoreBio(!lerMoreBio)}
              >
                {!lerMoreBio ? 'Ler mais' : 'Ler menos'}
              </LerMoreBio>
            ) : null
        }
      </About>
      <ActionWrapper>
        {
          !isUserArtist
            ? renderSubiscribeActions(isFollowing, followToggle)
            : renderEditAction(editAction)
        }
        {/* <LinkButton color="white">Ler release</LinkButton> */}
      </ActionWrapper>
      <Socials
        facebook={facebook}
        instagram={instagram}
        twitter={twitter}
        spotify={spotify}
      />
    </Wrapper>
  );
}

ArtistBasicInfo.propTypes = {
  about: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  spotify: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followToggle: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isUserArtist: PropTypes.bool.isRequired,
};

export default ArtistBasicInfo;
