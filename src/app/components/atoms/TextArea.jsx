/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { white10, white } from '../../settings/colors';

const Wrapper = styled.div`
  position: relative;
`;
const Cont = styled.label`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.875em;
  color: ${white10};
`;

const TextAreaComp = styled.textarea`
  width: 100%;
  height: 139px;
  color: ${white};
  background-color: ${white10};
  border-radius: 19px;
  padding: 15px;
  resize: none;
  font-size: 0.875em;
  font-family: inherit;
  font-weight: 200;

  :focus {
    outiline: none;
    box-shadow: none;
    padding: 15px;
    font-size: 1rem;
  }
`;

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains PasswordInput Component
 */
const TextArea = props => (
  <Wrapper>
    <TextAreaComp {...props} />
    {props.maxLength ? <Cont>{`${props.value.length}/${props.maxLength}`}</Cont> : null}
  </Wrapper>
);

export default TextArea;

TextArea.defaultProps = {
  value: '',
  maxLength: null,
};

TextArea.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.number,
};
