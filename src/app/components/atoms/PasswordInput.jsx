import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white10, white, secondaryRed, secondaryYellow, terciaryGreen,
  transparent,
} from '../../settings/colors';

function getColor(point) {
  if (point <= 0) return transparent;
  if (point < 60) return secondaryRed;
  if (point < 90) return secondaryYellow;
  return terciaryGreen;
}

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
  vertical-align: middle;
`;

const PasswordInputWrapper = styled.div`
  width: ${props => props.width};
  height: 38px;
  background-color: ${white10};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;

  :focus-within {
    border: solid 2px ${props => getColor(props.point)};
  }
`;

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains PasswordInput Component
 */
function PasswordInput(props) {
  const [visibility, setvisibility] = useState(false);
  const {
    onChange, placeholder, value, width, point,
  } = props;
  const src = visibility ? '/icons/visibility_outlined.svg' : '/icons/visibility_off_outlined.svg';
  return (
    <PasswordInputWrapper width={width} point={point}>
      <Input onChange={onChange} placeholder={placeholder} value={value} type={visibility ? 'text' : 'password'} />
      <Icon src={src} alt="" onClick={() => setvisibility(!visibility)} />
    </PasswordInputWrapper>
  );
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
  point: PropTypes.number,
};

PasswordInput.defaultProps = {
  placeholder: '',
  width: 'auto',
  point: 10,
};

export default PasswordInput;
