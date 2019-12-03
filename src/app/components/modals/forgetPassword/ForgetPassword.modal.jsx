import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import Store from '../../../store/Store';
import { black } from '../../../settings/colors';
import { blockBodyScroll, allowBodyScroll } from '../../../utilities/scroll';
import FormSendResetRequest from './components/FormSendResetRequest';
import FormSentResetRequest from './components/FormSentResetRequest';
import FormResetPassword from './components/FormResetPassword';
import FormInvalidToken from './components/FormInvalidToken';
import FormPasswordReseted from './components/FormPasswordReseted';
import { phoneMask } from './validations';
import { validateToken } from './controller';

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

function backToLogin(dispatch) {
  dispatch({ type: 'SHOW_LOGIN_MODAL' });
}

function showForgetPasswordModal(dispatch) {
  dispatch({ type: 'SHOW_FORGET_PASSWORD_MODAL' });
}

function ForgetPassword({ history, location }) {
  const initialInputDevice = {
    currentOption: 'mail',
    currentInput: '',
    options: ['mail', 'phone'],
    devices: {
      mail: {
        placeholder: 'Informe o e-mail',
        inputFunction: arg => arg,
        maxLength: 50,
      },
      phone: {
        placeholder: 'Informe o celular',
        inputFunction: phoneMask,
        maxLength: 15,
      },
    },
  };
  const initialNewPassword = {
    password: { value: '', error: '', errorColor: '' },
    confirmPassword: { value: '', error: '', errorColor: '' },
  };

  const { state, dispatch } = useContext(Store);
  const [currentStep, setCurrentStep] = useState('step1');
  const [inputDevice, setInputDevice] = useState(initialInputDevice);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  const ida = window.localStorage.getItem('som@ida');
  const token = window.localStorage.getItem('som@token');
  const resetPasswordToken = qs.parse(location.search).token;

  const closeModal = () => {
    allowBodyScroll();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const FormSteps = {
    step1: {
      render: () => FormSendResetRequest(
        () => backToLogin(dispatch), closeModal,
        inputDevice, error, setInputDevice, setError, () => setCurrentStep('step2'),
      ),
    },
    step2: {
      render: () => FormSentResetRequest(() => { closeModal(); setCurrentStep('step1'); }),
    },
    step3: {
      render: () => FormResetPassword(
        newPassword, setNewPassword, resetPasswordToken, setCurrentStep,
      ),
    },
    step4: {
      render: () => FormInvalidToken(() => { closeModal(); setCurrentStep('step1'); }),
    },
    step5: {
      render: () => FormPasswordReseted(() => { closeModal(); setCurrentStep('step1'); }),
    },
  };

  useEffect(() => {
    setInputDevice({
      ...inputDevice,
      currentInput:
        inputDevice.devices[inputDevice.currentOption].inputFunction(inputDevice.currentInput),
    });
  }, [inputDevice.currentOption]);

  useEffect(() => {
    async function isValidToken() {
      const validation = await validateToken(resetPasswordToken);
      return validation;
    }

    if (location.pathname === '/reset-password' && resetPasswordToken) {
      isValidToken().then(
        (result) => {
          const nextStep = result ? 'step3' : 'step4';
          setCurrentStep(nextStep);
          showForgetPasswordModal(dispatch);
        },
      );
    }
  }, []);

  if (state.modals.forgetPassword && (!ida && !token)) blockBodyScroll();
  // if (true && (!ida && !token)) blockBodyScroll();
  if (state.modals.forgetPassword && ida) history.push('/event/5d3a31e9dd3e02dd26be4fd2');
  return (
    <ForgetPasswordWrapper id="forgetPassword" isOpen={state.modals.forgetPassword && (!ida && !token)}>
      <Container>
        {FormSteps[currentStep].render()}
      </Container>
    </ForgetPasswordWrapper>
  );
}

const historyShape = {
  push: PropTypes.func,
};

const routerParamsShape = {
  pathname: PropTypes.string,
  search: PropTypes.string,
};

ForgetPassword.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
  location: PropTypes.shape(routerParamsShape).isRequired,
};

export default withRouter(ForgetPassword);
