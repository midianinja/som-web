import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from '../atoms/Avatar.atom';

const HeaderComponent = styled.header`
  display: none;

  @media (min-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    z-index: 10;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
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
  font-weight: 300;
  vertical-align: middle;
  margin-right: 10px;
`;

function Header({ avatar, name }) {
  return (
    <HeaderComponent>
      <Wrapper>
        <Logo src="/images/logo.svg" alt="SOM - Sistema Operacional da Música" />
        <AvatarWrapper>
          <Name>{name}</Name>
          <Avatar src={avatar} customStyle={avatarCustomStyle} />
        </AvatarWrapper>
      </Wrapper>
    </HeaderComponent>
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
