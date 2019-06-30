import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from '../atoms/Avatar.atom';

const Wrapper = styled.header`
  display: none;

  @media (min-width: 1024px){
    display: flex;
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const AvatarWrapper = styled.div``;
const avatarCustomStyle = `
  width: 38px;
  height: 38px;
  vertical-align: middle;
`;

const Logo = styled.img`
  height: 15px;
`;

const Name = styled.h3`
  color: white;
  display: inline-block;
  font-size: 0.7857142857em;
  vertical-align: middle;
  margin-right: 10px;
`;

function Header({ avatar, name }) {
  return (
    <Wrapper>
      <Logo src="/images/logo.svg" alt="SOM - Sistema Operacional da Música" />
      <AvatarWrapper>
        <Name>{name}</Name>
        <Avatar src={avatar} customStyle={avatarCustomStyle} />
      </AvatarWrapper>
    </Wrapper>
  );
}

Header.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
};

Header.defaultProps = {
  avatar: '',
  name: '',
};

export default Header;
