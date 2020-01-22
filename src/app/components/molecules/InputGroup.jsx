import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { secondaryRed, white } from '../../settings/colors';

const InptGroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  ${props => props.customStyle}
`;

const Label = styled.label`
  display: inline-block;
  font-size: 0.8em;
  color: ${white}
  margin-bottom: 10px;
  margin-left: 5px;
`;

const ErrorText = styled.span`
  position: absolute;
  bottom: -20px;
  font-size: 0.8em;
  margin-bottom: 10px;
  margin-left: 5px;
  font-weight: 300;   
  color: ${secondaryRed};  
`;

const InfoText = styled.span`
  font-size: 0.6em;
  margin-left: 5px
  color: ${white};
  font-weight: 300;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;


const InputGroup = ({
  children, label, info, error, customStyle, customLabelStyle, customErrorStyle,
}) => (
  <InptGroupContainer customStyle={customStyle}>
    {label ? <Label customStyle={customLabelStyle}>{label}</Label> : null}
    <InputWrapper customStyle={customStyle}>
      {children}
    </InputWrapper>
    {(info && !error) ? <InfoText>{info}</InfoText> : null}
    {error ? <ErrorText customStyle={customErrorStyle}>{error}</ErrorText> : null}
  </InptGroupContainer>
);

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  customStyle: PropTypes.string,
  customLabelStyle: PropTypes.string,
  customErrorStyle: PropTypes.string,
  info: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
  customStyle: '',
  customLabelStyle: '',
  customErrorStyle: '',
};

export default InputGroup;
