import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import { white } from '../../../../settings/colors';

const ExitArrow = styled.img`
  width: 22px;
`;

const LinkToBack = styled.div`
  margin: 30px auto 0 auto;
  color: ${white}
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;
const LinkToModal = styled.a`
  text-decoration: none;
  color: ${white};
  font-size: 0.9em;
  font-weight: 300;
  cursor: pointer;
  margin-left:  10px;
`;

const title = 'Link enviado!';
const instructions = ['O link para resetar sua senha foi enviado. Não esqueça de conferir na caixa de spam.'];

function FormSentResetRequest(closeModal) {
  return (
    <Form title={title} instructions={instructions} showExitArrow={false}>
      <LinkToBack>
        <ExitArrow onClick={closeModal} src="/icons/arrow_forward_left.svg" />
        <LinkToModal onClick={closeModal}>Voltar pra home</LinkToModal>
      </LinkToBack>
    </Form>
  );
}

export default FormSentResetRequest;
