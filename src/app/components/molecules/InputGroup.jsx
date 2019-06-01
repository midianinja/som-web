import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  magenta, white,
} from '../../settings/colors';

const InptGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const Label = styled.label`
  font-size: 0.8em;
  color: ${white}
  margin-bottom: 5px;
`;

const ErrorText = styled.span`
  font-size: 0.7em;
  color: ${magenta};
`;

const InfoText = styled.span`
    font-size: 0.6em;
    margin-top: 5px;
    color: ${white};
`;

const InputGroup = ({
  children, label, info, error,
}) => (
  <InptGroupContainer>
    {label ? <Label>{label}</Label> : null}
    {children}
    {info ? <InfoText>{info}</InfoText> : null}
    {error ? <ErrorText>{error}</ErrorText> : null}
  </InptGroupContainer>
);

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default InputGroup;
