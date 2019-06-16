import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray, white30 } from '../../settings/colors';

const Button = styled.button`
  height: 38px;
  width: 100%;
  background-color: transparent;
  color: ${white30};
  border: dashed 1px ${white30};
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 38px;
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: 0.8571428571em;
  font-weight: 300;

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }
`;

function MoreASongButton({ onClick }) {
  return (
    <Button onClick={onClick}>Carregar mais músicas +</Button>
  );
}

MoreASongButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MoreASongButton;
