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

const LinkButton = styled.button`
  height: ${props => getSize(props.size)};
  background-color: transparent;
  color: ${props => getColor(props.color)};
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: 0.8571428571em;
  
  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }
`;

LinkButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

LinkButton.defualtProps = {
  size: 'medium',
  color: 'purple',
};

export default LinkButton;
