import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`

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
