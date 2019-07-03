import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import Cover from '../../atoms/Cover';
import PrimaryButton from '../../atoms/PrimaryButton';
import LinkButton from '../../atoms/LinkButton';
import { white, white30 } from '../../../settings/colors';

const Wrapper = styled.header`
  padding-bottom: 40px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-size: 2.1428571429em;
  font-weight: 400;
  line-height: 1.1em;
`;

const ConnectionsWrapper = styled.div``;

const buttonCustomStyled = `
  width: 150px;
  margin-right: 15px;
`;

const avatarCustomStyled = `
  width: 140px;
  height: 140px;
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

function Header(props) {
  const { name, avatar, followers, following, isFollowing, cover, about } = props;

  return (
    <Wrapper>
      <Cover cover={cover}>
        <Avatar customStyle={avatarCustomStyled} src={avatar} alt={name} />
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
      </Cover>
      <About>{about}</About>
      <ActionWrapper>
        <PrimaryButton customStyle={buttonCustomStyled}>Seguir</PrimaryButton>
        <LinkButton color='white'>Ler release</LinkButton>
      </ActionWrapper>
    </Wrapper>
  );
}

Header.propTypes = {
  about: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
