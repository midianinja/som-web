import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  white, purple, green, orange, magenta, gray,
} from '../../settings/colors';

const sizes = {
  medium: '38px',
};

/**
 * function that getting size based on props
 * @param {string} key it is size key
 * @returns contains size in pixel
 */
function getSize(key) {
  return sizes[key] ? sizes[key] : sizes.medium;
}

const colors = {
  purple, green, orange, magenta, gray,
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

const PrimaryButton = styled.button`
  height: ${props => getSize(props.size)};
  padding-left: 30px;
  padding-right: 30px;
  border-radius: ${props => getSize(props.size)};
  background-color: ${props => getColor(props.color)};
  color: ${white}
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: 0.8571428571em;
  
  :active {
    background-color: ${props => getHoverColor(props.color)};
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }
`;

PrimaryButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

PrimaryButton.defualtProps = {
  size: 'medium',
  color: 'purple',
};

export default PrimaryButton;
