import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { secondaryRed, white } from '../../settings/colors';

const InptGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  ${props => props.customStyle}
`;

const Label = styled.label`
  font-size: 0.8em;
  color: ${white}
  margin-bottom: 5px;
  margin-left: 5px;
  ${props => props.customStyle}
`;

const ErrorText = styled.span`
  font-size: 0.8em;
  margin-top: 5px;
  margin-left: 5px;
  font-weight: 300;   
  color: ${secondaryRed};
  
  ${props => props.customStyle}
`;

const InfoText = styled.span`
  font-size: 0.6em;
  margin-top: 5px;
    margin-left: 5px
    color: ${white};
    font-weight: 300;
`;

const InputGroup = ({
  children, label, info, error, customStyle, customLabelStyle, customErrorStyle,
}) => (
  <InptGroupContainer customStyle={customStyle}>
    {label ? <Label customStyle={customLabelStyle}>{label}</Label> : null}
    {children}
    {info ? <InfoText>{info}</InfoText> : null}
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
