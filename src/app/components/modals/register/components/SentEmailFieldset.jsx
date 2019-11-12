import React, { Fragment } from 'react';
import styled from 'styled-components';
import { white, green } from '../../../../settings/colors';

const Title = styled.h2`
  color: ${white};
  font-size: 1.875em;
  line-height: 1.20833333333em;
  font-weight: 300;
  max-width: 200px;
  margin-bottom: 35px;
`;

const Label = styled.label`
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.65em;
  color: ${white};
  margin-bottom: 20px;
`;

const Resend = styled.p`
  color: ${green};
  font-weight: 300;
  font-size: 0.7142857143em;
`;

const Arrow = styled.img`
  width: 18px;
  cursor: pointer;
  vertical-align: middle;
  margin-right: 5px;
`;

const Bold = styled.strong`
  font-weight: 400;
  margin-left: 5px;
`;

const ToHome = styled.div`
  padding: 0px 30px;
  margin-top: 45px;
  font-size: 0.8571428571em;
  font-weight: 300;
  text-align: center;
  color: ${white};
`;

function SentEmailFieldset(resendClick, toHomeClick) {
  return (
    <Fragment>
      <Title>Confirmação enviada</Title>
      <Label>
        Agora é só clicar no link enviado para o seu e-mail e sua conta estará ativa.
        <Bold>Não esqueça de checar a caixa de spam :)</Bold>
      </Label>
      <Resend onClick={resendClick}>
        Não recebeu?
        <Bold>Reinsira seus dados</Bold>
      </Resend>
      <ToHome onClick={toHomeClick}>
        <Arrow src="/icons/arrow_forward_left.svg" />
        Voltar para a home
      </ToHome>
    </Fragment>
  );
}

export default SentEmailFieldset;
