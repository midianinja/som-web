import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white, purple, green, orange, magenta, yellow,
} from '../../settings/colors';

const colors = {
  purple, green, orange, magenta, yellow,
};

/**
 * function that get color based on props
 * @param {string} key it is color key
 * @returns contains color in hexa or rgba
 */
function getColor(key) {
  return colors[key] ? colors[key] : colors.purple;
}

const TagWrapper = styled.label`
  display: inline-block;
  padding: 2px 5px;
  padding-right: 12px;
  background-color: ${props => getColor(props.color)};
  color: ${white};
  text-transform: lowercase;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 0.8571428571em;
  margin-right: 10px;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 5px;
`;

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains Tag Component
 */
function Tag(props) {
  const { color, handleClose, text } = props;
  return (
    <TagWrapper color={color}>
      <CloseIcon
        color={color}
        src="/icons/cancel_outlined.svg"
        alt="botão de cancelar"
        onClick={handleClose}
      />
      {text}
    </TagWrapper>
  );
}

Tag.propTypes = {
  color: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  text: PropTypes.string,
};

Tag.defaultProps = {
  color: 'purple',
  text: 'Label',
};

export default Tag;
