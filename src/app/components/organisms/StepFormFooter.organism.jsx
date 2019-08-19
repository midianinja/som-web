import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray } from '../../settings/colors';
import PrimaryButton from '../atoms/PrimaryButton';

const Footer = styled.div`
  display: flex;
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  flex-direction: column;
  padding: 30px;
  ${props => props.customStyle}
`;

const Icon = styled.img`
  width: 13px;
  height: 13px;
  margin-left: 10px;
  vertical-align: middle;
`;

const StepFormFooter = ({ nextAction, skipAction, customStyle }) => {
  return (
    <Footer customStyle={customStyle}>
      <PrimaryButton onClick={nextAction} customStyle='padding: 20px 0; height: auto; letter-spacing: 3px;'>
        CONTINUAR
      </PrimaryButton>
      <PrimaryButton
        onClick={skipAction}
        color='transparent'
        customStyle={`padding: 20px 0; height: auto; color: ${gray}`}
      >
        Pular etapa
        <Icon src='/icons/right_arrow.svg' />
      </PrimaryButton>
    </Footer>
  );
};

StepFormFooter.propTypes = {
  nextAction: PropTypes.func.isRequired,
  skipAction: PropTypes.func.isRequired,
  customStyle: PropTypes.string,
};

StepFormFooter.defaultProps = {
  customStyle: '',
};

export default StepFormFooter;
