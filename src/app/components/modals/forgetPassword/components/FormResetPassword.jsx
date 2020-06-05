import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import Input from '../../../atoms/Input';
import InputGroup from '../../../molecules/InputGroup';
import { white, white10, gray } from '../../../../settings/colors';
import {
  passwordValidation, getPasswordPoint, getPasswordPointMessage, getPasswordPointColor,
} from '../validations';
import { sendNewPassword } from '../controller';

const Arrow = styled.img`
  width: 36px;
`;

const inputGroupStyle = `
  margin-top: 30px;
  margim-bottom: 0px;
`;

const inputGroupLabelStyle = `
  color: ${gray};
`;

const ButtonWithIcon = styled.button`
  width: 230px;
  color: ${white}
  height: 70px;
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

  @media (max-width: 768px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const Container = styled.div`
  max-width: 230px;
  display: block;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const title = 'Recuperar senha';
function FormResetPassword(newPassword, setNewPassword, resetPasswordToken, setCurrentStep) {
  function handlePasswordChange(event) {
    const { target: { id, value } } = event;
    const point = getPasswordPoint(value);
    const errorColor = `color: ${getPasswordPointColor(point)}`;
    const errorMessage = getPasswordPointMessage(point);
    setNewPassword({
      ...newPassword,
      [id]: { value, error: errorMessage, errorColor },
    });
    // setNewPassword({ ...newPassword });
  }

  function handleConfirmPasswordChange(event) {
    const { target: { id, value } } = event;
    const errorMessage = value === newPassword.password.value ? '' : 'Por favor, repita a mesma senha';
    setNewPassword({
      ...newPassword,
      [id]: { value, error: errorMessage },
    });
  }

  async function handleSendPassword(event) {
    event.preventDefault();
    const isConfirmed = newPassword.password.value === newPassword.confirmPassword.value;
    if (passwordValidation(newPassword.password.value) && isConfirmed) {
      const promise = await sendNewPassword(resetPasswordToken, newPassword.password.value);
      const step = promise ? 'step5' : 'step4';
      setCurrentStep(step);
    }
  }

  return (
    <Form title={title}>
      <Container>
        <InputGroup
          customStyle={inputGroupStyle}
          customLabelStyle={inputGroupLabelStyle}
          customErrorStyle={newPassword.password.errorColor}
          label="Nova senha"
          error={newPassword.password.error}
        >
          <Input
            id="password"
            type="password"
            placeholder="informe a nova senha"
            value={newPassword.password.value}
            onChange={e => handlePasswordChange(e)}
          />
        </InputGroup>
        <InputGroup
          customLabelStyle={inputGroupLabelStyle}
          customErrorStyle={newPassword.confirmPassword.errorColor}
          label="Confirmar nova senha"
          error={newPassword.confirmPassword.error}
        >
          <Input
            id="confirmPassword"
            type="password"
            placeholder="confirme a nova senha"
            value={newPassword.confirmPassword.value}
            onChange={e => handleConfirmPasswordChange(e)}
          />
        </InputGroup>
      </Container>
      <ButtonWithIcon onClick={(e) => {
        handleSendPassword(e);
      }}
      >
        Redefinir senha
        <Arrow src="/icons/arrow_forward_right.svg" />
      </ButtonWithIcon>
    </Form>
  );
}

export default FormResetPassword;
