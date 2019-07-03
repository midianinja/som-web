import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputGroup from '../molecules/InputGroup';
import { green, gray, white, orange } from '../../settings/colors';

const Button = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 100%;
  margin-bottom: 15px;
  background-color: ${orange};
  color: ${white};
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 38px;
  cursor: pointer;
  transition-duration: 0.3s;
  font-weight: 300;
  font-size: 0.8571428571em;

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }
`;

const UploaddedButton = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  width: 100%;
  margin-bottom: 15px;
  background-color: transparent;
  border: solid 1px ${green}
  color: ${white};
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 38px;
  text-transform: lowercase;
  cursor: pointer;
  transition-duration: 0.3s;
  font-weight: 300;
  font-size: 0.8571428571em;

  :focus {
    outline: none;
  }

  :disabled {
    background-color: ${gray};
    cursor: not-allowed;
  }
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 10px;
  vertical-align: middle;
`;

const Input = styled.input`
  display: none;
`;

const handleClick = () => {};

function UploadSongButton({ handleChange, id }) {
  return (
    <Fragment>
      <InputGroup>
        <Button htmlFor={`file-${id}`} onClick={handleClick}>
          Subir música
          <Icon src='/icons/upload-song.svg' />
        </Button>
      </InputGroup>
      <Input type='file' id={`file-${id}`} />
    </Fragment>
  );
}

function UploaddedSongButton({ handleChange, id }) {
  return (
    <Fragment>
      <UploaddedButton htmlFor={`file-${id}`} onClick={handleClick}>
        <Icon src='/icons/green-check.svg' />
      </UploaddedButton>
      <Input type='file' id={`file-${id}`} />
    </Fragment>
  );
}

UploadSongButton.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default UploaddedSongButton || UploadSongButton;
