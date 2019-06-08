import styled from 'styled-components';
import { white, orange } from '../../settings/colors';

const AudioSlider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  :focus {
    outline: none;
  }

  ::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    border-radius: 50%;
    width: 10px;
    margin-left: -2;
    background: ${orange};
    background: url('/icons/group-balls.svg');
    cursor: pointer;
    margin-top: -4px;
    position: relative;
  }
  


  ::-moz-range-thumb {
    height: 10px;
    border-radius: 50%;
    width: 10px;
    margin-left: -2;
    border-radius: 50%;
    background: ${orange};
    background: url('/icons/group-balls.svg');
    cursor: pointer;
  }

  ::-ms-thumb {
    height: 10px;
    border-radius: 50%;
    width: 10px;
    margin-left: -2;
    border-radius: 50%;
    background: ${orange};
    background: url('/icons/group-balls.svg');
    cursor: pointer;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    border-radius: 2px;
    cursor: pointer;
    background: ${white};
  }

  :active::-webkit-slider-runnable-track {
    background: #d6d6d6;
  }

  ::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: ${white};
  }

  ::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: ${white}sparent;
    border-color: transparent;
    color: transparent;
  }

  ::-ms-fill-lower {
    background: #ccc;
  }

  :focus::-ms-fill-lower {
    background: ${orange};
  }

  ::-ms-fill-upper {
    background: #ccc;
  }

  :focus::-ms-fill-upper {
  background: ${orange};
}
`;

export default AudioSlider;
