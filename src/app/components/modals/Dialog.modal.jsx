import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { purple, wrapperModal } from '../../settings/colors';
import PrimaryButton from '../atoms/PrimaryButton';

const Dialog = styled.div`
  width: 100%;
  max-width: 380px;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 25px;
  background-color: #FFF;
  text-align: left;
  padding: 30px;

  @media (min-width: 1024px) {
    padding: 40px;
  }
`;
const Description = styled.p`
  margin-top: 7px;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.625em;
  margin-bottom: 15px;

  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DialogWrapper = styled.section`
  display: ${(props) => {
    const { isOpen } = props;
    return !isOpen ? 'none' : 'flex';
  }};
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 30px;
  background-color: ${wrapperModal};
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 20;
`;

const BackButton = styled.a`
  margin-right: 15px;
  color: ${purple};
`;

const Title = styled.h2`
  font-size: 1.3285714286em;
  font-weight: 400;
  margin-bottom : 15px;

  @media (min-width: 1024px) {
    font-size: 1.4285714286em;  
  }
`;

const DialogModal = ({
  title, description, confirmAction, disagreeAction, agreeText, disagreeText,
  isOpen,
}) => (
  <DialogWrapper isOpen={isOpen}>
    <Dialog>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Actions>
        <BackButton onClick={disagreeAction}>{disagreeText}</BackButton>
        <PrimaryButton onClick={confirmAction}>{agreeText}</PrimaryButton>
      </Actions>
    </Dialog>
  </DialogWrapper>
);

DialogModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
  confirmAction: PropTypes.func.isRequired,
  disagreeAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

DialogModal.defaultProps = {
  title: 'Title',
  description: 'Description',
  agreeText: 'agree',
  disagreeText: 'disagree',
  isOpen: false,
};

export default DialogModal;
