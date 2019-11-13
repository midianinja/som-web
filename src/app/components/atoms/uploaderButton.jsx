import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputGroup from '../molecules/InputGroup';
import { white, purple, green, gray } from '../../settings/colors';

const Button = styled.label`
  display: inline-block;
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

  ${(props) => props.customStyle}
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 5px;
  vertical-align: middle;
`;

const Input = styled.input`
  display: none;
`;

const customInputGroupStyle = `
  margin-bottom: 0px;
`;

const UploadSongButton = ({ handleClick, text, accept }) => (
  <InputGroup customStyle={customInputGroupStyle}>
    <Fragment>
      <Button htmlFor={`file-${text}`}>
        {`Subir ${text}`}
        <Icon src='/icons/upload.svg' />
      </Button>
      <Input type='file' accept={accept} id={`file-${text}`} onChange={handleClick} />
    </Fragment>
  </InputGroup>
);

UploadSongButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  accept: PropTypes.string,
};

UploadSongButton.defaultProps = {
  text: 'Label',
  accept: '',
};

export default UploadSongButton;
