import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black50, white } from '../../settings/colors';
import { getGradient } from '../../settings/gradients';
import LinkButton from '../atoms/LinkButton';

const ModalWrapper = styled.div`
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

const Modal = styled.div`
  border-radius: 20px;
  width: 100%;
  max-width: 380px;
  overflow: hidden;
  background-color: ${white};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 187px;
  background: ${getGradient()};
`;

const Icon = styled.img`
  width: 90px;
`;

const Content = styled.div`
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 1.5714285714em;
  font-weight: 700;
`;

const Message = styled.h3`
  font-size: 1em;
  font-weight: 300;
  line-height: 1.625em;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const buttonStyle = `
  font-size: 1em;
`;

function Subscribed({ festival, isOpen }) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <Modal>
        <IconWrapper>
          <Icon src='/icons/yeah.svg' alt='yeah, você está inscrito no festival.' />
        </IconWrapper>
        <Content>
          <Title>Pronto!</Title>
          <Message>
            {`Você está inscrito no festival ${festival}. Fique ligado no SOM para receber novas informações.`}
          </Message>
          <LinkButton customStyle={buttonStyle}>Voltar pro SOM</LinkButton>
        </Content>
      </Modal>
    </ModalWrapper>
  );
}

Subscribed.propTypes = {
  festival: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
};

Subscribed.defualtProps = {
  isOpen: false,
};

export default Subscribed;
