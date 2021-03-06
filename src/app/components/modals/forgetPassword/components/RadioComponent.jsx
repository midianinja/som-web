import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, purple, secondaryPurple } from '../../../../settings/colors';

const RadioContainer = styled.div`
  width: 100%;
  height: 38px;
  overflow: hidden;
  color: ${white};
  font-size: 0.875em;
`;

const RadioButton = styled.input`
  display: none;
  &:checked + label {
    cursor: default;
    color: ${white};
    transition: color 200ms;
    &:after{
        left: 0;
    }
  }
`;

const RadioLabelRight = styled.label`
  margin-left: -5px;
  &::after{
    left: -100%;
  }
  border-radius: 0px 30px 30px 0px;
  ${props => props.customStyle}
`;

const RadioLabelLeft = styled.label`
  border-right: 0;
  &::after{
    left: 100%;
  }
  border-radius: 30px 0px 0px 30px;
  ${props => props.customStyle}
`;

const RadioLabelStyle = `
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border: 3px solid ${secondaryPurple};
  position: relative;
  transition: background 400ms ease, color 600ms ease;
  cursor: pointer;

  &:hover{
    background: none;
    color: ${purple};
  }
  &::after{
    background: ${secondaryPurple};
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
    width: 100%;
    z-index: -1;
   }
`;

function RadioComponent({ handleClick, checked }) {
  return (
    <RadioContainer>
      <RadioButton id="toggle-on" onChange={handleClick} name="device" value="email" type="radio" checked={checked} />
      <RadioLabelLeft customStyle={RadioLabelStyle} htmlFor="toggle-on">E-mail</RadioLabelLeft>
      <RadioButton id="toggle-off" onChange={handleClick} name="device" value="fone" type="radio" checked={!checked} />
      <RadioLabelRight customStyle={RadioLabelStyle} htmlFor="toggle-off">Celular</RadioLabelRight>
    </RadioContainer>
  );
}


RadioComponent.propTypes = {
  handleClick: PropTypes.func,
  checked: PropTypes.bool.isRequired,
};

RadioComponent.defaultProps = {
  handleClick: () => {},
};

export default RadioComponent;
