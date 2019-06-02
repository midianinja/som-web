import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  white, purple, green, gray,
} from '../../settings/colors';

const Button = styled.div`
  background-color: ${purple};
  color: ${white};
  font-size: 13px;
  line-height: 26px;
  text-align: center;
  width: 142px;
  height: 30px;
  border-radius: 30px;
  margin: 0;
  cursor: pointer;

  :active {
    background-color: ${green};
  }

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }

  ${props => props.customStyle}
`;

const Title = styled.div`
  vertical-align: middle;
  display: inline-block;
  margin-right: 15px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const UploaderButton = ({ customStyle, text, handleClick }) => (
  <Button customStyle={customStyle} onClick={handleClick}>
    <Title>{`Subir ${text}`}</Title>
    <Icon src="/icons/upload.svg" />
  </Button>
);

UploaderButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  customStyle: PropTypes.string,
  text: PropTypes.string,
};

UploaderButton.defaultProps = {
  text: 'Label',
  customStyle: '',
};

export default UploaderButton;
