import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import InputGroup from '../molecules/InputGroup';
import Input from '../atoms/Input';
import CircularButton from '../atoms/CircularButton';
import LinkButton from '../atoms/LinkButton';
import { black, gray, white } from '../../settings/colors';
import Store from '../../store/Store';
import { blockBodyScroll, allowBodyScroll } from '../../utils/scroll';

const LoginWrapper = styled.section`
  display: ${(props) => {
    const { isOpen } = props;
    return isOpen ? 'block' : 'none';
  }};
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  z-index: 30;
  background-color: ${black};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;

  @media (min-width: 768px) {
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const Icon = styled.img`
  width: 100%;
  max-width: 230px;
  display: block;
  position: relative;
  right: -40px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    display: inline-block;
    max-width: 400px;
    vertical-align: middle;
    right: 0px;
  }
`;

const Arrow = styled.img`
  width: 100%;
`;

const ExitArrow = styled.img`
  width: 22px;
  position: absolute;
  top: 15px;
  right: 30px;
  cursor: pointer;

  @media (min-width: 768px) {
    top: 30px;
  }
`;

const inputGroupStyle = `
  margin-bottom: 20px;
`;

const inputGroupLabelStyle = `
  color: ${gray};
`;

const Form = styled.form`
  width: 100%;
  @media (min-width: 768px) {
    display: inline-block;
    width: calc(100% - 404px);
    max-width: 400;
    vertical-align: middle;
  }
`;

const Title = styled.h1`
  color: ${white};
  font-size: 3em;
  line-height: 1.20833333333em;
  font-weight: 400;
  max-width: 230px;
  margin-top: -60px;
  margin-bottom: 30px;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;

const RegisterLink = styled.a`
  text-decoration: none;
  color: ${white};
  font-weight: 300;
`;

const ForgetPasswordLink = styled.a`
  text-decoration: none;
  color: ${white};
  font-size: 0.7142857143em;
  font-weight: 300;
  margin-top: 10px;
  margin-left: 5px;
`;

function registerAction(dispatch) {
  dispatch({ type: 'SHOW_REGISTER_MODAL' });
}

function closeModal(dispatch) {
  allowBodyScroll();
  dispatch({ type: 'CLOSE_MODAL' });
}

function Login() {
  const { state, dispatch } = useContext(Store);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  if (state.modals.login) blockBodyScroll();

  return (
    <LoginWrapper id="login" isOpen={state.modals.login}>
      <Container>
        <ExitArrow src="/icons/arrow_forward_left.svg" />
        <Icon src="/icons/login.svg" onClick={() => closeModal(dispatch)} />
        <Form>
          <Title>Bem vindx de volta!</Title>
          <InputGroup
            customStyle={inputGroupStyle}
            customLabelStyle={inputGroupLabelStyle}
            label="Nome de usuário"
            error={error.username}
          >
            <Input
              id="username"
              type="text"
              placeholder=""
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup
            customStyle={inputGroupStyle}
            customLabelStyle={inputGroupLabelStyle}
            label="Senha"
            error={error.password}
          >
            <Input
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <ForgetPasswordLink>Esqueci minha senha</ForgetPasswordLink>
          </InputGroup>
          <Actions>
            <CircularButton>
              <Arrow src="/icons/arrow_forward_right.svg" />
            </CircularButton>
            <LinkButton
              color="white"
              type="button"
              onClick={() => registerAction(dispatch)}
            >
              Criar conta
            </LinkButton>
          </Actions>
        </Form>
      </Container>
    </LoginWrapper>
  );
}

export default Login;
