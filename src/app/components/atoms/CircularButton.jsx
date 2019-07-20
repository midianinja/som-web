import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, purple, green, orange, magenta, gray, secondaryPurple, transparent } from '../../settings/colors';

const colors = {
  secondaryPurple,
  purple,
  green,
  orange,
  magenta,
  gray,
  transparent,
};

/**
 * function that getting color based on props
 * @param {string} key it is color key
 * @returns contains color in hexa or rgba
 */
function getColor(key) {
  return colors[key] ? colors[key] : colors.purple;
}

const hoverColors = {
  purple: green,
};

/**
 * function that getting hover color based on props
 * @param {string} key it is hover color key
 * @returns contains hover color in hexa or rgba
 */
function getHoverColor(key) {
  return hoverColors[key] ? colors[key] : hoverColors.purple;
}

const CircularButton = styled.button`
  width: 50px;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 50%;
  background-color: ${(props) => getColor(props.color)};
  color: ${white};
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: 0.8571428571em;

  :active {
    background-color: ${(props) => getHoverColor(props.color)};
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }

  ${(props) => props.customStyle}
`;

CircularButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  customStyle: PropTypes.string,
};

CircularButton.defualtProps = {
  color: 'purple',
  customStyle: '',
};

export default CircularButton;
