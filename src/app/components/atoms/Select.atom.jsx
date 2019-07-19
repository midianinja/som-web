import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, white10, white30, white } from '../../settings/colors';

const SelectWrapper = styled.div`
  color: ${(props) => {
    const { focus, selected } = props;
    const isOpacity = !(focus || selected);
    return !isOpacity ? white : white30;
  }};
  background-color: ${white10};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;

  :focus {
    outline: none;
    border-radius: 19px;
  }
`;

const Image = styled.img``;

const Arrow = styled.img`
  width: 12px;
  height: 12px;
`;

const Option = styled.li`
  height: 25px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 0.8571428571em;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 25px;

  :hover {
    background-color: ${green};
  }
`;

const Options = styled.ul`
  overflow: hidden;
  max-height: ${(props) => {
    const { focus } = props;
    return !focus ? '0px' : '192px';
  }};
  transition-duration: ${(props) => {
    const { focus } = props;
    return !focus ? '0s' : '0.2s';
  }};
  overflow-y: auto;
  ${(props) => {
    const { focus } = props;
    return focus ? 'padding: 15px;' : '';
  }};
`;

const Label = styled.label`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8571428571em;
`;

/**
 * function that render options on props
 * @param {array} options it is the options that to be render
 * @param {function} onClick it is the function that select the option
 * @returns contains Option Component array
 */
const renderOptions = (options, onClick) =>
  options.map(({ id, image, label }) => (
    <Option key={id} id={id} onClick={() => onClick({ id, label, image })}>
      <Image src={image} visible={!!image} />
      {label}
    </Option>
  ));

function Select(props) {
  const [focus, setFocus] = useState(false);
  const { placeholder, options, selected, tabIndex, onSelect } = props;

  return (
    <SelectWrapper focus={focus} onBlur={() => setFocus(false)} tabIndex={tabIndex}>
      <Label onClick={() => setFocus(!focus)}>
        {selected.label || placeholder}
        <Arrow src={!focus ? '/icons/down-arrow.svg' : '/icons/up-arrow.svg'} alt={focus ? '' : ''} />
      </Label>
      <Options focus={focus}>{renderOptions(options, onSelect)}</Options>
    </SelectWrapper>
  );
}

const optionShape = {
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

Select.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(optionShape)),
  selected: PropTypes.shape(optionShape),
  onSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

Select.defaultProps = {
  placeholder: 'Selecione',
  options: [],
  selected: {},
  tabIndex: 1,
};

export default Select;
