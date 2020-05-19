import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  green, white10, white30,
  white,
} from '../../settings/colors';
import Input from '../atoms/Input';

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

  ${(props) => {
    const { focus } = props;
    if (focus) {
      return `
        outline: none;
        border-radius: 19px 19px 0px 0px;
      `;
    }
    return '';
  }}
  
`;

const Image = styled.img``;

const Option = styled.li`
  padding: 3px;
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
    cursor: pointer;
  }
`;

const Options = styled.ul`
  position: absolute;
  background-color: #1a1a1a;
  top: 37px;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-radius: 0px 0px 19px 19px;
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
  z-index: 2;
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
const renderOptions = (options, onClick) => options.map((value) => {
  const { id, label, image } = value;
  return (
    <Option
      key={id}
      id={id}
      onClick={() => onClick(value)}
    >
      <Image src={image} visible={!!image} />
      {label}
    </Option>
  );
});

const normalizeString = (text) => {
  let str = text;
  str = str.replace(/[ÀÁÂÃÄÅ]/g, 'A');
  str = str.replace(/[àáâãäå]/g, 'a');
  str = str.replace(/[ÈÉÊË]/g, 'E');

  return str.replace(/[^a-zA-Z ]/g, '').toUpperCase();
};

const handleChange = (
  event, setValue, options, setList,
) => {
  const { value } = event.target;

  const list = options.filter((op) => {
    const label = normalizeString(op.label);
    const myValue = normalizeString(value);
    return label.indexOf(myValue) >= 0;
  });

  setValue(value);
  setList(list);
};

function ListInput(props) {
  const {
    placeholder, options, selected, id,
    tabIndex, onSelect,
  } = props;
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [list, setList] = useState(options);
  useEffect(() => {
    setList(options);
  }, [options]);
  const select = (data) => {
    setValue('');
    onSelect(data);
    setFocus(false);
  };
  return (
    <SelectWrapper focus={focus} tabIndex={tabIndex}>
      <Label>
        <Input
          id={id}
          onFocus={() => setFocus(true)}
          customStyle="background-color: transparent;"
          placeholder={selected.label || placeholder}
          onBlur={e => e.preventDefault()}
          value={value || ''}
          autoComplete="new-password"
          onChange={e => handleChange(e, setValue, options, setList)}
        />
      </Label>
      <Options focus={focus}>{renderOptions(list, select)}</Options>
    </SelectWrapper>
  );
}

const optionShape = {
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

ListInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(optionShape)),
  selected: PropTypes.shape(optionShape),
  onSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
};

ListInput.defaultProps = {
  placeholder: 'Selecione',
  id: `${(Math.random() * 999)}`,
  options: [],
  selected: {},
  tabIndex: 1,
};

export default ListInput;
