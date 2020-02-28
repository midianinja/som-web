import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white, gray, green,
} from '../../settings/colors';

const Wrapper = styled.div``;

const Circle = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 2px ${(props) => {
    const { checked } = props;
    return checked ? green : gray;
  }};
  vertical-align: middle;
  position: relative;
  
  ${(props) => {
    const { checked } = props;
    if (!checked) return '';
    return `
      &:after {
        content: '';
        display: inline-block;
        border-radius: 50%;
        right: 2px; 
        top: 2px;
        position: absolute;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: ${green};
      }
    `;
  }}
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${white};
  margin-left: 10px;
  vertical-align: middle;
`;

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains NewsletterInput Component
 */
function Checkbox({
  checked, text, onChange,
}) {
  return (
    <Wrapper onClick={onChange}>
      <Circle checked={checked} />
      <Label>{text}</Label>
    </Wrapper>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {};

export default Checkbox;
