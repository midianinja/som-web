import styled from 'styled-components';
import { white10, white } from '../../settings/colors';

const TextArea = styled.textarea`
  width: 100%;
  height: 139px;
  color: ${white};
  background-color: ${white10};
  border-radius: 19px;
  padding: 15px;
  resize: none;
  font-size: 1em;
  font-family: inherit;
  font-weight: 200;

  :focus {
    outiline: none;
    box-shadow: none;
    padding: 15px;
    font-size: 1em;
  }
`;

export default TextArea;
