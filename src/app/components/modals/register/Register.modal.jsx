import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../atoms/PrimaryButton';
import createAccountFieldset from './components/CreateAccountFieldset';
import emailFieldset from './components/EmailFieldset';
import phoneFieldset from './components/PhoneFieldset';
import selectConfirmationMathodFieldset from './components/SelectConfirmationMathodFieldset';
import sentEmailFieldset from './components/SentEmailFieldset';
import sentPhoneFieldset from './components/SentPhoneFieldset';
import {
  usernameValidation, passwordValidation, getPasswordPoint,
  phoneValidation,
} from './validations';
import {
  createAccount, generatePhoneCodeSubmit, validatePhoneCodeSubmit,
} from './controller';
import { purple, black50 } from '../../../settings/colors';
import Store from '../../../store/Store';
import { allowBodyScroll } from '../../../utilities/scroll';

const RegisterWrapper = styled.section`
  display: ${(props) => {
    const { isOpen } = props;
    return !isOpen ? 'none' : 'flex';
  }};
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
  padding: 30px;
  background-color: ${black50};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 15px 30px 15px;
  background-color: ${purple};
  border-radius: 20px;
`;

const ExitWrapper = styled.div`
  text-align: right;
`;

const ExitIcon = styled.img`
  width: 22px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
`;

const Fieldset = styled.div`
  min-height: 275px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Actions = styled.div`
  width: 100%;
  display: ${(props) => {
    const { hide } = props;
    return hide ? 'none' : 'flex';
  }};
  justify-content: space-between;
  align-items: center;
`;

function Register({ history }) {
  const { state, dispatch } = useContext(Store);
  const [ida, setIDA] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState('account');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [method, setMethod] = useState('');
  const [error, setError] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    const regex = /^[a-zA-Z0-9]{1,}$/;
    let message = null;
    if (!e.target.value) {
      message = 'Preencha o campo username';
    } else if (!regex.test(e.target.value)) {
      message = 'Ultilize apenas caracteres do alfabeto e numerais';
    }

    setError({ ...error, username: message });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const point = getPasswordPoint(e.target.value);
    let message = '';
    if (point <= 0) message = '';
    if (point < 60) message = 'Senha fraca';
    if (point < 90) message = 'Senha razoável';
    if (point >= 90) message = 'Senha forte';

    setError({ ...error, password: message });
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (!phoneValidation(e.target.value)) {
      setError({ ...error, phone: 'Número inválido. Ex: +5511999999999' });
    } else {
      setError({ ...error, phone: null });
    }
  };

  const closeModal = () => {
    allowBodyScroll();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCodeChange = (inputCode) => {
    if (inputCode.length > 6) {
      return;
    }

    if (inputCode.length === 6) {
      validatePhoneCodeSubmit({
        ida, code: inputCode, setError, navigationTo: history.push, token,
        closeModal,
      });
    }

    setCode(inputCode);
  };

  const fields = {
    account: {
      render: () => (
        step === 'account' ? createAccountFieldset(
          username, handleUsernameChange, password, handlePasswordChange, error,
        ) : null),
      next: 'methods',
      validation: () => (
        usernameValidation(username) && passwordValidation(password)
      ),
      submit: createAccount,
    },
    email: {
      render: () => emailFieldset(email, setEmail, error),
      validation: () => true,
      next: 'sentEmail',
    },
    phone: {
      render: () => phoneFieldset(phone, handlePhoneChange, error),
      validation: () => phoneValidation(phone),
      next: 'sentPhone',
      submit: generatePhoneCodeSubmit,
    },
    methods: {
      render: () => selectConfirmationMathodFieldset(method, setMethod, error),
      validation: () => true,
      next: method === 'phone' ? 'phone' : 'email',
    },
    sentEmail: {
      render: () => sentEmailFieldset(() => setStep('email')),
    },
    sentPhone: {
      render: () => sentPhoneFieldset(code, handleCodeChange, () => setStep('phone'), error),
      validation: () => code.length === 6,
      submit: validatePhoneCodeSubmit,
    },
  };

  const data = {
    ida, step, username, password, email, phone, code, method, error,
    setIDA, setStep, setUsername, setPassword, setEmail, setPhone, setCode, setMethod, setError,
    token, setToken,
  };
  const field = fields[step];
  return (
    <RegisterWrapper id="register" isOpen={state.modals.register}>
      <Container>
        <ExitWrapper>
          <ExitIcon onClick={closeModal} src="/icons/arrow_forward_left.svg" />
        </ExitWrapper>
        <Form autoComplete="off">
          <Fieldset>
            {field.render()}
          </Fieldset>
          <Actions hide={!field.next}>
            <PrimaryButton
              color="white"
              type="button"
              disabled={!field.validation()}
              onClick={() => {
                const { submit, next } = field;
                return submit ? submit(data) : setStep(next);
              }}
            >
              Próximo
            </PrimaryButton>
          </Actions>
        </Form>
      </Container>
    </RegisterWrapper>
  );
}

const historyShape = {
  push: PropTypes.func,
};

Register.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(Register);
