import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import Socials from '../../organisms/Socials';
import PrimaryButton from '../../atoms/PrimaryButton';
import LinkButton from '../../atoms/LinkButton';
import { white, white30 } from '../../../settings/colors';

const Wrapper = styled.section`
  display: inline-block;
  width: 100%;
  max-width: 420px;
  padding-bottom: 40px;

  @media (min-width: 1024px) {
    position: fixed;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-size: 2.1428571429em;
  font-weight: 400;
  line-height: 1.1em;

  @media (min-width: 1024px) {
    padding-left: 10px;
    padding-right: 0px;
    margin-top: 0;
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
  padding-left: 40px;
  padding-right: 40px;
  text-align: left;
  font-size: 0.8571428571em;
`;

const ActionWrapper = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  text-align: left;
`;

function ArtistBasicInfo(props) {
  const {
    name, avatar, followers, following,
    isFollowing, about,
  } = props;

  return (
    <Wrapper id="infos">
      <Avatar
        customStyle={avatarCustomStyled}
        src={avatar}
        alt={name}
      />
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
      <About>{about}</About>
      <ActionWrapper>
        <PrimaryButton customStyle={buttonCustomStyled}>Seguir</PrimaryButton>
        <LinkButton color='white'>Ler release</LinkButton>
      </ActionWrapper>
      <Socials />
    </Wrapper>
  );
}

ArtistBasicInfo.propTypes = {
  about: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default ArtistBasicInfo;
