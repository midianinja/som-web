import styled from 'styled-components';
import PropTypes from 'prop-types';
import { white50, white10, white } from '../../settings/colors';

const Input = styled.input`
  height: 38px;
  color: ${white};
  background-color: ${white10};
  border-radius: 38px;
  padding-left: 15px;
  padding-right: 15px;

  :focus {
    outiline: none;
    box-shadow: none;
    padding-left: 14px;
    padding-right: 14px;
  }

  ::placeholder {
    color: ${white50};
    opacity: 1;
  }
  
  :-ms-input-placeholder {
    color: ${white50};
  }
  
  ::-ms-input-placeholder {
    color: ${white50};
  }

  ${props => props.customStyle}
`;

Input.propTypes = {
  customStyle: PropTypes.string,
};

Input.defaultProps = {
  customStyle: '',
};

export default Input;
