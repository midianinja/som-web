import React, { Fragment } from 'react';
import styled from 'styled-components';
import MethodButton from '../../../atoms/MethodButton';
import { white } from '../../../../settings/colors';

const Title = styled.h2`
  color: ${white};
  font-size: 1.875em;
  line-height: 1.20833333333em;
  font-weight: 300;
  max-width: 200px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 0.7142857143em;
  font-weight: 300;
  color: ${white};
  margin-bottom: 10px;
`;

function SelectConfirmationMathodFieldset(confirmationMethod, setConfirmationMethod) {
  return (
    <Fragment>
      <Title>Agora vamos confirmar sua identidade</Title>
      <Label>Confirmar identidade com:</Label>
      <div>
        <MethodButton
          text="SMS"
          iconSrc="/icons/phone.svg"
          selected={confirmationMethod === 'phone'}
          onClick={() => setConfirmationMethod('phone')}
        />
        <MethodButton
          text="E-mail"
          iconSrc="/icons/mail.svg"
          selected={confirmationMethod === 'email'}
          onClick={() => setConfirmationMethod('email')}
        />
      </div>
    </Fragment>
  );
}

export default SelectConfirmationMathodFieldset;
