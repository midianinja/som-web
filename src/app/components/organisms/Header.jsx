import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
  white, black, magenta, purple,
} from '../../settings/colors';
import { getGradient } from '../../settings/gradients';
import Store from '../../store/Store';
import { blockBodyScroll } from '../../utilities/scroll';
import Input from '../atoms/Input';
import DropdownHeader from '../molecules/DropdownHeader';

const HeaderComponent = styled.header`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  padding-left: 15px;  
  padding-right: 15px;

  @media (min-width: 1024px) {
    padding-left: 0px;    
    padding-right: 0px;    
  }

  ${(props) => {
    if (props.type === 'artist') {
      return `
        background-color: ${magenta};
      `;
    }

    if (props.type === 'productor') {
      return `
        background-color: ${purple};
      `;
    }

    return `
      background-color: ${white};
    `;
  }}

  ${props => props.customStyle}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`;

const BurgerButton = styled.div`
  width: 22px;
  cursor: pointer;
  
  ${(props) => {
    const { hide } = props;
    return hide ? 'display: none;' : '';
  }}
`;

const Line = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${white};

  & + & {
    margin-top: 4px;
  }

  ${(props) => {
    if (props.dark) {
      return `
        background-color: ${black};
      `;
    }

    return '';
  }}
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const RightGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-self: end;

  ${(props) => {
    if (props.hide) {
      return `
        display: none;
      `;
    }

    return '';
  }}
`;

const Avatar = styled.img`
  width: auto;
  height: 32px;
  border-radius: 50%;
  background: ${getGradient()};
  cursor: pointer;
  user-select: none;
`;

const Name = styled.h4`
  font-size: 1rem;
  font-weight: 200;
  color: ${white};
  margin-right: 15px;
  cursor: pointer;
  user-select: none;

  ${(props) => {
    if (props.dark) {
      return `
        color: ${black};
      `;
    }

    return '';
  }}
`;

const SignWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LoginText = styled.h4`
  font-size: 1rem;
  font-weight: 200;
  color: ${black};
  margin-right: 15px;
  user-select: none;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LoginIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const inputCustomStyle = `
  display: none;
  background-color: ${black};
  margin-left: 20px;
  height: 36px;
  max-width: 312px;
  
  &:focus {
    margin-left: 20px;
  }

  @media (min-width: 768px) {
    display: inline-block;
  }
`;

function Header({ customStyle, history }) {
  const { state, dispatch } = useContext(Store);
  const [dropdown, setDropdown] = useState(false);
  const completed = state.user && state.user.productor
    && state.user.productor.status !== 'INCOMPLETE';
  useEffect(() => {
    setDropdown(false);
  }, [state.auth]);

  const getAvatarIcon = () => {
    if (state.connectionType === 'artist' && state.user.artist) {
      return state.user.artist.avatar_image.mimified;
    }

    if (state.connectionType === 'productor' && state.user.productor) {
      return state.user.productor.photo;
    }

    return '#';
  };

  const getName = () => {
    if (state.connectionType === 'artist' && state.user.artist) {
      return state.user.artist.name;
    }

    if (state.connectionType === 'productor' && state.user.productor) {
      return state.user.productor.name;
    }

    return 'Sem nome';
  };

  return (
    <HeaderComponent
      type={state.connectionType}
      customStyle={customStyle}
    >
      <Wrapper>
        <Group>
          <BurgerButton
            onClick={() => {
              blockBodyScroll();
              setDropdown(false);
              dispatch({ type: 'SHOW_NAVIGATION_MODAL' });
            }}
          >
            <Line dark={state.connectionType === 'public'} />
            <Line dark={state.connectionType === 'public'} />
            <Line dark={state.connectionType === 'public'} />
          </BurgerButton>
          {/* <Input
            placeholder="O que você procura?"
            value=""
            customStyle={inputCustomStyle}
            onChange={() => null}
          /> */}
        </Group>
        <RightGroup hide={!state.auth}>
          <ProfileWrapper onClick={() => setDropdown(!dropdown)}>
            <Name dark={state.connectionType === 'public'}>{getName()}</Name>
            <Avatar src={getAvatarIcon()} alt="" />
          </ProfileWrapper>
          <DropdownHeader
            hide={!dropdown}
            name={getName()}
            completed={completed}
            avatar={getAvatarIcon()}
            closeAction={() => setDropdown(false)}
            connectionType={state.connectionType}
            onAccountChange={(type) => {
              if (type === 'artist' && !state.user.artist) {
                history.push('/register-artist');
              }

              if (type === 'productor' && !state.user.productor) {
                history.push('/register-productor');
              }
              window.localStorage.setItem('som@type', type);
              dispatch({ type: 'SET_LOGIN_TYPE', data: type });
              setDropdown(false);
            }}
            onLogout={() => {
              window.localStorage.setItem('som@ida', '');
              window.localStorage.setItem('som@token', '');

              dispatch({
                type: 'SET_USER',
                user: null,
              });

              dispatch({
                type: 'RESET_AUTH',
              });

              dispatch({
                type: 'SET_LOGIN_TYPE',
                data: 'public',
              });

              setDropdown(false);
            }}
            toArtist={() => {
              if (state.user.artist) {
                history.push(`/artist/${state.user.artist.id}`);
              }
            }}
            toProductor={() => {
              if (state.user.productor && state.user.productor.status === 'INCOMPLETE') {
                history.push('/register-productor');
                return;
              }
              if (state.user.productor) {
                history.push(`/productor/${state.user.productor.id}`);
              }
            }}
          />
        </RightGroup>
        <RightGroup hide={state.auth}>
          <SignWrapper
            onClick={() => {
              blockBodyScroll();
              dispatch({ type: 'SHOW_LOGIN_MODAL' });
            }}
          >
            <LoginText>Faça login</LoginText>
            <LoginIcon src="/icons/account_circle.svg" alt="" />
          </SignWrapper>
        </RightGroup>
      </Wrapper>
    </HeaderComponent>
  );
}
Header.propTypes = {
  customStyle: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
