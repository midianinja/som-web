import PropTypes from 'prop-types';
import styled from 'styled-components';
import { purple, green, orange, magenta, gray, black } from '../../settings/colors';

const sizes = {
  small: '30px',
  medium: '38px',
  default: 'none',
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
  purple,
  green,
  orange,
  magenta,
  gray,
  black,
};

/**
 * function that getting color based on props
 * @param {string} key it is color key
 * @returns contains color in hexa or rgba
 */
function getColor(key) {
  return colors[key] ? colors[key] : colors.purple;
}

const fontSizes = {
  medium: '0.8571428571em',
  large: '1em',
  xlarge: '1.3em',
};

const getFontSize = (key) => (fontSizes[key] ? fontSizes[key] : fontSizes.medium);

const LinkButton = styled.button`
  height: ${(props) => getSize(props.size)};
  background-color: transparent;
  color: ${(props) => getColor(props.color)};
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: ${(props) => getFontSize(props.fontSize)}
  line-height: 1em;
  
  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }

  ${(props) => props.customStyle}
`;

LinkButton.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  customStyle: PropTypes.string,
};

LinkButton.defualtProps = {
  size: 'medium',
  color: 'purple',
  customStyle: '',
};

export default LinkButton;
