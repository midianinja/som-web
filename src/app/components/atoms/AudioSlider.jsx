import styled from 'styled-components';
import { white, orange, orange50 } from '../../settings/colors';

const AudioSlider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  margin-top: 20px;
  position: relative;

  :before {
    content: '';
    position: absolute;
    display: inline-block;
    height: 10px;
    width: 10px;
    bottom: -3.5px;
    border-radius: 50%;
    background: ${white};
    cursor: pointer;
    z-index: 1;
  }

  :after {
    content: '';
    position: absolute;
    display: inline-block;
    height: 10px;
    width: 10px;
    bottom: -3.5px;
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
    height: 10px;
    border-radius: 50%;
    width: 10px;
    background: ${orange};
    cursor: pointer;
    margin-top: -4px;
    box-shadow: 0px 0px 0px 8px ${orange50};
    position: relative;
    z-index: 2;
  }

  ::-webkit-slider-thumb:after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: green;
  }

  ::-moz-range-thumb {
    height: 10px;
    border-radius: 50%;
    width: 10px;
    margin-left: -2;
    border-radius: 50%;
    background: ${orange};
    cursor: pointer;
    z-index: 2;
  }

  ::-ms-thumb {
    height: 10px;
    border-radius: 50%;
    width: 10px;
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
