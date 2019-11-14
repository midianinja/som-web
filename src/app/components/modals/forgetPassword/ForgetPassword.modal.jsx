import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../../store/Store';
import InputGroup from '../../molecules/InputGroup';
import { black, white, white10 } from '../../../settings/colors';
import { sentEmail } from './repository';
import { blockBodyScroll, allowBodyScroll } from '../../../utilities/scroll';
import InputWithTransparency from '../../atoms/InputWithTransparency';

const ForgetPasswordWrapper = styled.section`
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
  padding-top: 45px;

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
  width: 36px;
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
  margin-top: 30px;
  margim-bottom: 0px;
`;

const inputWithTransparencyStyle = `
  margim-bottom: 0px;
  padding: 2px;
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

const Instructions = styled.p`
  color: ${white};
  font-size: 0.8em;
  font-weight: 200;
  max-width: 230px;
  display: block;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ButtonWithIcon = styled.button`
  margin: 0 auto;
  color: ${white}
  height: 70px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  background-color: ${white10};
  border-radius: 50px;
  padding: 0 10px 0 30px;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;

const LinkToModal = styled.a`
  text-decoration: none;
  color: ${white};
  font-size: 0.7142857143em;
  font-weight: 300;
  cursor: pointer;
`;

function backToLogin(dispatch) {
  dispatch({ type: 'SHOW_LOGIN_MODAL' });
}

function ForgetPassword({ history }) {
  const { state, dispatch } = useContext(Store);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const ida = window.localStorage.getItem('som@ida');
  const token = window.localStorage.getItem('som@token');

  const closeModal = () => {
    allowBodyScroll();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  if (state.modals.forgetPassword && (!ida && !token)) blockBodyScroll();
  if (state.modals.forgetPassword && ida) history.push('/event/5d3a31e9dd3e02dd26be4fd2');

  return (
    <ForgetPasswordWrapper id="forgetPassword" isOpen={state.modals.forgetPassword && (!ida && !token)}>
      <Container>
        <ExitArrow onClick={closeModal} src="/icons/arrow_forward_left.svg" />
        <Icon src="/icons/login.svg" />
        <Form>
          <Title>Recuperar senha!</Title>
          <Instructions>
            Insira o seu e-mail cadastrado no SOM.
          </Instructions>
          <Instructions>
            Vamos te enviar um link para gerar uma nova senha
          </Instructions>
          <InputGroup customStyle={inputGroupStyle} label=" " error={error}>
            <InputWithTransparency placeholder="Senha" onChange={event => handleEmail(event)} customStyle={inputWithTransparencyStyle} />
          </InputGroup>
          <LinkToModal onClick={(e) => { e.preventDefault(); backToLogin(dispatch); }}>
            Lembrei! Voltar ao login
          </LinkToModal>
          <ButtonWithIcon onClick={(e) => { e.preventDefault(); sentEmail(email, setError); return false; }}>
            Enviar e-mail
            <Arrow src="/icons/arrow_forward_right.svg" />
          </ButtonWithIcon>
        </Form>
      </Container>
    </ForgetPasswordWrapper>
  );
}

const historyShape = {
  push: PropTypes.func,
};

ForgetPassword.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(ForgetPassword);
