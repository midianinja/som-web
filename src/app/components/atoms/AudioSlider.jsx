import styled from 'styled-components';
import {
  white, orange, orange15, orange50, yellow,
} from '../../settings/colors';

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
    bottom: -3px;
    border-radius: 50%;
    background: ${orange};
    cursor: pointer;
    z-index: 1;
  }

  :after {
    content: '';
    position: absolute;
    display: inline-block;
    height: 8px;
    width: 8px;
    bottom: -3px;
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
    box-sizing: content-box;
    -webkit-appearance: none;
    height: 8px;
    border-radius: 50%;
    width: 8px;
    background: ${orange};
    cursor: pointer;
    margin-left: -4px
    margin-top: -7px;
    box-shadow: 0px 0px 0px 6px ${orange15};
    position: relative;
    border: solid 4px ${orange50};
    -moz-background-clip: content;
    -webkit-background-clip: content;
    background-clip: content-box;
    z-index: 2;
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
    box-sizing: content-box;
    -webkit-appearance: none;
    height: 10px;
    border-radius: 50%;
    width: 10px;
    background: ${orange};
    cursor: pointer;
    margin-top: -8px;
    box-shadow: 0px 0px 0px 4px ${orange15};
    position: relative;
    border: solid 4px ${orange50};
    -moz-background-clip: content;
    -webkit-background-clip: content;
    background-clip: content-box;
    z-index: 2;
  }

  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    border-radius: 2px;
    cursor: pointer;
    background: ${white};
    background: 
      linear-gradient(90deg, ${orange} ${props => props.value / 10}%, ${white} ${props => props.value / 10}%);
  }

  :active::-webkit-slider-runnable-track {
    background: #d6d6d6;
  }

  ::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: ${orange};
  }

  ::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  ::-webkit-progress-value {
    background-color: ${orange}; 
  }

  ::-moz-range-progress {
    background-color: ${orange}; 
  }

  ::-moz-range-track {  
    background-color: ${white};
  }

  ::-ms-fill-lower {
    background-color: ${orange}; 
  }

  ::-ms-fill-upper {  
    background-color: ${white};
  }
`;

export default AudioSlider;
