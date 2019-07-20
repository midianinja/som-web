import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Store from '../../store/Store';
import {
  black50, black, white, purple,
} from '../../settings/colors';
import { allowBodyScroll } from '../../utils/scroll';

const links = [
  {
    href: '/',
    label: 'Início',
  },
  {
    href: '/me',
    label: 'Meu perfil',
  },
  {
    href: '/settings',
    label: 'Configurações',
  },
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

function renderLinks() {
  return links.map(({ href, label }) => (
    <Link href={href}>{label}</Link>
  ));
}

function Navigation() {
  const { state, dispatch } = useContext(Store);

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
        {renderLinks()}
        <Logout>Sair</Logout>
      </Nav>
    </Wrapper>
  );
}

export default Navigation;
