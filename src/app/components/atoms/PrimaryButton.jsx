import styled from 'styled-components';

const sizes = {
  small: '38px',
  medium: '58px',
};

function getSize(key) {
  return sizes[key] ? sizes[key] : sizes.medium;
}

const Button = styled.button()`
  width: '100%',
  height: ${props => getSize(props.size)}
`;

export default Button;
