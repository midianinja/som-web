import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../atoms/PrimaryButton';
import createAccountFieldset from './components/CreateAccountFieldset';
import emailFieldset from './components/EmailFieldset';
import phoneFieldset from './components/PhoneFieldset';
import selectConfirmationMathodFieldset from './components/SelectConfirmationMathodFieldset';
import sentEmailFieldset from './components/SentEmailFieldset';
import sentPhoneFieldset from './components/SentPhoneFieldset';
import { purple, black50 } from '../../../settings/colors';
import Store from '../../../store/Store';
import { blockBodyScroll } from '../../../utils/scroll';

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
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 15px 30px 15px;
  background-color: ${purple};
  border-radius: 20px;

  @media (min-width: 768px) {
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
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
  @media (min-width: 768px) {
    display: inline-block;
    width: calc(100% - 404px);
    max-width: 400;
    vertical-align: middle;
  }
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

function Register() {
  const { state, dispatch } = useContext(Store);
  const [step, setStep] = useState('account');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [method, setMethod] = useState('');
  const [error, setError] = useState({});

  if (state.modals.register) blockBodyScroll();
  const fieldsets = {
    account: {
      render: () => createAccountFieldset(username, setUsername, password, setPassword, error),
      next: 'methods',
    },
    email: {
      render: () => emailFieldset(email, setEmail, error),
      next: 'sentEmail',
    },
    phone: {
      render: () => phoneFieldset(phone, setPhone, error),
      next: 'sentPhone',
    },
    methods: {
      render: () => selectConfirmationMathodFieldset(method, setMethod, error),
      next: method === 'phone' ? 'phone' : 'email',
    },
    sentEmail: {
      render: () => sentEmailFieldset(() => setStep('email')),
    },
    sentPhone: {
      render: () => sentPhoneFieldset(code, setCode, () => setStep('phone'), error),
    },
  };

  const field = fieldsets[step];
  return (
    <RegisterWrapper id='register' isOpen={state.modals.register}>
      <Container>
        <ExitWrapper>
          <ExitIcon src='/icons/arrow_forward_left.svg' />
        </ExitWrapper>
        <Form>
          <Fieldset>{field.render()}</Fieldset>
          <Actions hide={!field.next}>
            <PrimaryButton color='white' type='button' onClick={() => setStep(field.next)}>
              Próximo
            </PrimaryButton>
          </Actions>
        </Form>
      </Container>
    </RegisterWrapper>
  );
}

export default Register;
