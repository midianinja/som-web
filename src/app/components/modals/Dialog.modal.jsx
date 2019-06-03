import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { purple, wrapperModal } from '../../settings/colors';
import PrimaryButton from '../atoms/PrimaryButton';

const Dialog = styled.div`
  width: 280px;
  height 207px;
  display: flex;
  justify-content: space-around;
  flex-direction: column
  border-radius: 25px
  background-color: #FFF
  padding: 24px
`;
const Description = styled.p`
  margin-top: 7px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DialogWrapper = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${wrapperModal};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.a`
  margin-right: 15px;
  color: ${purple};
`;

const Title = styled.h2`
  font-size: 1.25em;
`;

const DialogModal = ({ title, description, confirmAction, disagreeAction, agreeText, disagreeText }) => (
  <DialogWrapper>
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  agreeText: PropTypes.string.isRequired,
  disagreeText: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  disagreeAction: PropTypes.func.isRequired,
};

DialogModal.defualtProps = {
  title: 'Title',
  description: 'Description',
  agreeText: 'agree',
  disagreeText: 'disagree',
};

export default DialogModal;
