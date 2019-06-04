import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white10, white } from '../../settings/colors';

const Input = styled.input`
  width: calc(100% - 18px);
  height: 100%;
  color: ${white};
  background: transparent;
  padding-right: 10px;

  :focus {
    outiline: none;
    box-shadow: none;
    padding-right: 10px;
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const InputWithIconWrapper = styled.div`
  width: ${(props) => props.width}
  height: 38px;
  background-color: ${white10};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const icons = {
  calendar: '/icons/calendar.svg',
  info: '/icons/info.svg',
};

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains InputWithIcon Component
 */
function InputWithIcon(props) {
  const { onChange, placeholder, value, width, type, icon } = props;

  return (
    <InputWithIconWrapper width={width}>
      <Input onChange={onChange} placeholder={placeholder} value={value} type={type} />
      <Icon src={icons[icon]} alt='' />
    </InputWithIconWrapper>
  );
}

InputWithIcon.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
};

InputWithIcon.defaultProps = {
  placeholder: '',
  width: 'auto',
  type: 'text',
  icon: 'calendar',
};

export default InputWithIcon;
