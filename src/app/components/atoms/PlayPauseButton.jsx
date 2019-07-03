import styled from 'styled-components';
import { orange } from '../../settings/colors';

const PlayPauseButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${orange};
  border-radius: 50%;
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;

  :before {
    content: '';
    width: 18px;
    height: 18px;
    position: relative;
    left: 2px;
    background-image: url(${(props) => {
      const { play } = props;
      return play ? '/icons/play.svg' : '/icons/pause.svg';
    }});
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
`;

export default PlayPauseButton;
