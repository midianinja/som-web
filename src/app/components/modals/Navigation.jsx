import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Store from '../../store/Store';
import {
  black50, black, white, purple,
  magenta, orange,
} from '../../settings/colors';
import { allowBodyScroll } from '../../utilities/scroll';

const getLinks = (user, connectionType) => {
  const links = [
    {
      href: '/events',
      label: 'Início',
    },
    {
      href: user && user.artist && user.artist.id ? `/artist/${user.artist.id}` : '/register-artist',
      label: 'Meu perfil',
      hide: !user || connectionType !== 'artist',
    },
    {
      href: user && user.productor && user.productor.id ? `/productor/${user.productor.id}` : '/register-productor',
      label: 'Meu perfil',
      hide: !user || connectionType !== 'productor',
    },
    {
      href: '/events',
      label: 'Eventos',
    },
    {
      href: '/artists',
      label: 'Artistas',
    },
    {
      href: '/productors',
      label: 'Produtores',
    },
  ];

  if (connectionType === 'productor') {
    links.push({
      href: '/my-events',
      label: 'Meus eventos',
    });
  }

  return links;
};

const openModalKeyframes = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translateX(320px);
        -o-transform: translateX(320px);
        transform: translateX(320px);
    } to {
      opacity: 1;
      -webkit-transform: translateX(0px);
      -o-transform: translateX(0px);
      transform: translateX(0px);
    }
`;

const openMObileModalKeyframes = keyframes`
    from {
        opacity: 0;
    } to {
      opacity: 1;
    }
`;

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
  animation: ${openMObileModalKeyframes} 0.2s linear;
  -webkit-animation: ${openMObileModalKeyframes} 0.2s linear;

  @media (min-width: 1024px) {
    animation: ${openModalKeyframes} 0.1s linear;
    -webkit-animation: ${openModalKeyframes} 0.1s linear;
  }
`;

const Link = styled.a`
  width: 100%;
  font-size: 1.5em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  color: ${black};

  ${(props) => {
    if (props.type === 'artist') {
      return `
        &:hover {
          color: ${magenta}; 
        }
      `;
    }

    if (props.type === 'productor') {
      return `
        &:hover {
          color: ${purple}; 
        }
      `;
    }

    return `
      &:hover {
        color: ${orange}; 
      }
    `;
  }}

  ${(props) => {
    if (props.hide) return 'display: none;';
    return '';
  }}
  
`;

const Logout = styled.a`
  width: 100%;
  font-size: 1em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  color: ${black};
  cursor: pointer;

  ${(props) => {
    if (props.type === 'artist') {
      return `
        &:hover {
          color: ${magenta}; 
        }
      `;
    }

    if (props.type === 'productor') {
      return `
        &:hover {
          color: ${purple}; 
        }
      `;
    }

    return `
      &:hover {
        color: ${orange}; 
      }
    `;
  }}
`;

const Terms = styled.a`
  width: 100%;
  font-size: 1em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: none;
  display: block;
  margin-top: 40px;
  color: ${black};
  cursor: pointer;

  ${(props) => {
    if (props.type === 'artist') {
      return `
        &:hover {
          color: ${magenta}; 
        }
      `;
    }

    if (props.type === 'productor') {
      return `
        &:hover {
          color: ${purple}; 
        }
      `;
    }

    return `
      &:hover {
        color: ${orange}; 
      }
    `;
  }}
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

function renderLinks(user, connectionType, history) {
  return getLinks(user, connectionType).map(({ href, label, hide }) => (
    <Link
      type={connectionType}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        history.push(href);
      }}
      hide={hide}
    >
      {label}
    </Link>
  ));
}

const closeAction = (dispatch) => {
  allowBodyScroll();
  dispatch({ type: 'CLOSE_MODAL' });
};

function Navigation({ history }) {
  const { state, dispatch } = useContext(Store);

  return (
    <Wrapper isOpen={state.modals.navigation} onClick={() => closeAction(dispatch)}>
      <Nav>
        <ExitButton
          src="/icons/close.svg"
          onClick={() => closeAction(dispatch)}
        />
        {renderLinks(state.user, state.connectionType, history)}
        <Terms
          type={state.connectionType}
          onClick={() => {
            allowBodyScroll();
            dispatch({ type: 'CLOSE_MODAL' });
            window.open(
              '/terms',
              '_blank',
            );
          }}
        >
          Termos de uso
        </Terms>
        {
          state.user ? (
            <Logout
              type={state.connectionType}
              onClick={() => {
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

                allowBodyScroll();
                dispatch({ type: 'CLOSE_MODAL' });

                history.push('/');
              }}
            >
              Sair
            </Logout>
          ) : null
        }
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
