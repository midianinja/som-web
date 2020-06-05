import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';
import PrimaryButton from '../atoms/PrimaryButton';
import Loading from '../atoms/Loading.atom';

const Footer = styled.div`
  display: flex;
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px;
  ${props => props.customStyle}
`;

const Wrapper = styled.div`
  width: 100%;
  ${props => props.customStyle}
`;

const LoadingWrapper = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
`;

const StepEventFormFooter = ({
  saveAction, cancelAction, customStyle, loading,
  actionLabel,
}) => (
  <Wrapper customStyle={customStyle}>
    {
      !loading ? (
        <Footer customStyle={customStyle}>
          <PrimaryButton
            color="green"
            onClick={saveAction}
            customStyle="width: 200px; padding: 20px 0px; margin-right: 30px; height: auto;"
          >
            {actionLabel}
          </PrimaryButton>
          <PrimaryButton
            onClick={cancelAction}
            color="transparent"
            customStyle={`padding: 20px 0; height: auto; color: ${white}`}
          >
            Descartar alterações
          </PrimaryButton>
        </Footer>
      ) : (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )
    }
  </Wrapper>
);

StepEventFormFooter.propTypes = {
  saveAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  customStyle: PropTypes.string,
  actionLabel: PropTypes.string,
};

StepEventFormFooter.defaultProps = {
  actionLabel: 'CONTINUAR',
  customStyle: '',
};

export default StepEventFormFooter;
