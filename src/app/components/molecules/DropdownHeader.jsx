import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white, black, magenta, purple,
  theBestColor, alertColor,
} from '../../settings/colors';
import { getGradient } from '../../settings/gradients';

const Dropdown = styled.div`
  position: absolute;
  position: fixed;
  overflow: hidden;
  background-color: ${white};
  width: 100%;
  top: 0;
  right: 0;
  min-width: 310px;
  min-height: 100vh;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    top: calc(100% + 30px);
    position: absolute;
    min-height: 200px;
    border-radius: 20px;
  }

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
  display: inline-block;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: ${getGradient()};
  cursor: pointer;
  margin-top: 24px;

  @media (min-width: 1024px) {
    margin-top: 34px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Name = styled.h4`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${black};
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const LoginStatus = styled.h4`
  font-size: 0.875rem;
  font-weight: 200;
  cursor: pointer;
  margin-bottom: 30px;

  ${(props) => {
    if (props.type === 'artist') {
      return `
        color: ${magenta};
      `;
    }

    if (props.type === 'productor') {
      return `
        color: ${purple};
      `;
    }

    return `
      color: ${black};
    `;
  }}
`;

const ChagingAccount = styled.h4`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 200;
  cursor: pointer;
  background-color: ${theBestColor};
  padding: 15px;

  & > span {
    font-weight: 500;

    ${(props) => {
    if (props.type === 'artist') {
      return `
        color: ${magenta};    
      `;
    }

    if (props.type === 'productor') {
      return `
        color: ${purple};
      `;
    }

    return `
      color: ${black};
    `;
  }}
  }

  ${(props) => {
    if (props.hide) {
      return `
        display: none;
      `;
    }

    return '';
  }}
`;

const Navigation = styled.div`
  border-top: 1px solid ${theBestColor};
  border-bottom: 1px solid ${theBestColor};
  padding: 10px;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${black};
  font-size: 0.875rem;
  font-weight: 200;
  cursor: pointer;
  padding: 10px;
`;

const ExitLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${black};
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  padding: 20px;
`;

const Alert = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  background-color: ${alertColor};
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ExitWrapper = styled.div`
  width: 100%;
  text-align: right;
  padding-top: 15px;
  padding-right: 15px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ExitButton = styled.img`
  width: 18px;
  top: 15px;
`;

const DropdownHeader = ({
  hide, connectionType, avatar, name,
  completed, onLogout, onAccountChange,
  toArtist, toProductor, closeAction,
}) => {
  const getLoginType = () => {
    if (connectionType === 'productor' && completed) {
      return 'Produtor';
    }

    if (connectionType === 'productor' && !completed) {
      return 'Finalizar seu cadastro';
    }

    if (connectionType === 'artist' && completed) {
      return 'Artista';
    }

    if (connectionType === 'artist' && !completed) {
      return 'Finalizar seu cadastro';
    }

    return 'Público';
  };

  return (
    <Dropdown hide={hide}>
      <Wrapper>
        <ExitWrapper>
          <ExitButton
            src="/icons/close.svg"
            onClick={() => closeAction()}
          />
        </ExitWrapper>
        <Avatar src={avatar} alt="" />
        <Name>{name}</Name>
        <LoginStatus
          onClick={connectionType === 'artist' ? toArtist : toProductor}
          type={connectionType}
        >
          {getLoginType()}
        </LoginStatus>
        <ChagingAccount
          type="productor"
          hide={connectionType === 'productor'}
          onClick={() => onAccountChange('productor')}
        >
          Usar como&nbsp;
          <span>produtor</span>
        </ChagingAccount>
        <ChagingAccount
          type="artist"
          hide={connectionType === 'artist'}
          onClick={() => onAccountChange('artist')}
        >
          Usar como&nbsp;
          <span>artista</span>
        </ChagingAccount>
      </Wrapper>
      <Wrapper>
        {/* <Navigation>
          <Link href="/" onClick={e => e.preventDefault()}>
            Configurações da conta
          </Link>
          <Link href="/" onClick={e => e.preventDefault()}>
            <Alert />
            Notificações
          </Link>
        </Navigation> */}
      </Wrapper>
      <Wrapper>
        <ExitLink
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
        >
          Sair
        </ExitLink>
      </Wrapper>
    </Dropdown>
  );
};

DropdownHeader.propTypes = {
  hide: PropTypes.bool.isRequired,
  completed: PropTypes.bool,
  connectionType: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  onAccountChange: PropTypes.func.isRequired,
  toArtist: PropTypes.func.isRequired,
  toProductor: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
};

DropdownHeader.defaultProps = {
  completed: true,
};

export default DropdownHeader;
