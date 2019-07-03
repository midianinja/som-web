import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white10, white, gray02 } from '../../settings/colors';

const Input = styled.input`
  height: 38px;
  position: absolute;
  color: ${white};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  background-color: transparent;

  :focus {
    outiline: none;
    box-shadow: none;
    padding-left: 14px;
    padding-right: 14px;
  }
  ${(props) => props.customStyle}
`;

const Wrapper = styled.div`
  position: relative;
  height: 38px;
`;

const AutocompleteInput = ({ value, predict, handleChange, handleSelect }) => (
  <Wrapper>
    <Input
      type='search'
      customStyle='z-index: 2;'
      onChange={handleChange}
      keyn
      onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : null)}
      value={value}
      onKeyUp={(e) => (e.keyCode === 13 && predict ? handleSelect(predict) : null)}
    />
    <Input
      type='text'
      disabled
      value={predict}
      customStyle={`z-index: 1; background-color: ${white10}; color: ${gray02};`}
    />
  </Wrapper>
);

AutocompleteInput.propTypes = {
  value: PropTypes.string.isRequired,
  predict: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default AutocompleteInput;
