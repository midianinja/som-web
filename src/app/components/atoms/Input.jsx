import styled from 'styled-components';
import {
  white10, white,
} from '../../settings/colors';

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
`;

export default Input;
