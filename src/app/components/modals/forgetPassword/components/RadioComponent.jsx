import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, purple, secondaryPurple } from '../../../../settings/colors';

const RadioContainer = styled.div`
  margin-top: 20px;
  font-size: 0.8em;
  font-weight: 200;
  color: ${white};
`;

const Legend = styled.p`
  margin-bottom: 20px;
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
  ${props => props.customStyle}
`;

const RadioLabelLeft = styled.label`
  border-right: 0;
  &::after{
    left: 100%;
  }
  ${props => props.customStyle}
`;

const RadioLabelStyle = `
  border: 3px solid ${secondaryPurple};
  display: inline-block;
  padding: 10px;
  position: relative;
  text-align: center;
  transition: background 600ms ease, color 600ms ease;
  cursor: pointer;
  min-width: 90px;

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
      <Legend>Enviar link por: </Legend>
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
