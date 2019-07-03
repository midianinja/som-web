import styled from 'styled-components';
import { white, orange } from '../../settings/colors';

const AudioSlider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  margin-top: 20px;
  position: relative;

  :before {
    content: '';
    position: absolute;
    display: inline-block;
    height: 8px;
    width: 8px;
    bottom: -2.5px;
    border-radius: 50%;
    background: ${white};
    cursor: pointer;
    z-index: 1;
  }

  :after {
    content: '';
    position: absolute;
    display: inline-block;
    height: 8px;
    width: 8px;
    bottom: -2.5px;
    right: 0px;
    border-radius: 50%;
    background: ${white};
    cursor: pointer;
    z-index: 1;
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
    height: 15px;
    border-radius: 50%;
    width: 15px;
    background: ${orange};
    cursor: pointer;
    margin-top: -7.5px;
    position: relative;
    z-index: 2;
  }

  ::-moz-range-thumb {
    height: 15px;
    border-radius: 50%;
    width: 15px;
    margin-left: -2;
    border-radius: 50%;
    background: ${orange};
    cursor: pointer;
    z-index: 2;
  }

  ::-ms-thumb {
    height: 15px;
    border-radius: 50%;
    width: 15px;
    margin-left: -2;
    border-radius: 50%;
    background: ${orange};
    cursor: pointer;
    z-index: 2;
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
