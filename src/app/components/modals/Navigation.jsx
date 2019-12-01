import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import {
  black50, black, white, purple,
} from '../../settings/colors';
import { allowBodyScroll } from '../../utilities/scroll';

const getLinks = () => [
  {
    href: '/',
    label: 'Início',
  },
  // {
  //   href: artist ? `/artist/${artist.id}` : '/register-artist',
  //   label: 'Meu perfil',
  // },
  // {
  //   href: '/settings',
  //   label: 'Configurações',
  // },
];

const Wrapper = styled.div`
  position: fixed;
  display: ${(props) => {
    const { isOpen } = props;
    return isOpen ? 'flex' : 'none';
  }};
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: ${black50};
`;

const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  height: 100%;
  padding: 30px;
  background-color: ${white};
`;

const Link = styled.a`
  width: 100%;
  font-size: 1.875em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  color: ${black};

  &:hover {
    color: ${purple}; 
  }
`;

const Logout = styled.a`
  width: 100%;
  font-size: 1.125em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: none;
  display: block;
  margin-top: 40px;
  color: ${black};
  cursor: pointer;

  &:hover {
    color: ${purple}; 
  }
`;

const ExitButton = styled.img`
  position: absolute;
  width: 18px;
  top: 15px;
  left: 15px;

  @media (min-width: 1024px) {
    left: initial;
    right: 15px;
  }
`;

function renderLinks(artist = {}) {
  return getLinks(artist).map(({ href, label }) => (
    <Link href={href}>{label}</Link>
  ));
}

function Navigation({ history }) {
  const { state, dispatch } = useContext(Store);
  console.log('state:', state);
  if (!state.user) return null;
  return (
    <Wrapper isOpen={state.modals.navigation}>
      <Nav>
        <ExitButton
          src="/icons/close.svg"
          onClick={() => {
            allowBodyScroll();
            dispatch({ type: 'CLOSE_MODAL' });
          }}
        />
        {renderLinks(state.user.artist)}
        <Logout
          onClick={() => {
            window.localStorage.setItem('som@ida', '');
            window.localStorage.setItem('som@token', '');

            dispatch({
              type: 'SET_USER',
              user: null,
            });

            dispatch({
              type: 'SET_AUTH',
              auth: null,
            });

            allowBodyScroll();
            dispatch({ type: 'CLOSE_MODAL' });
            history.push('/');
          }}
        >
          Sair
        </Logout>
      </Nav>
    </Wrapper>
  );
}

const historyShape = {
  push: PropTypes.func.isRequired,
};

Navigation.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(Navigation);
