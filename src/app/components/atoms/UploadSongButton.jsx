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
  background-color: transparent;
  border: solid 1px ${green}
  color: ${white};
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
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

const customInputGroupStyle = `
  margin-bottom: 0px;
`;

function UploadSongButton({ onChange, id }) {
  return (
    <Fragment>
      <InputGroup customStyle={customInputGroupStyle}>
        <Button htmlFor={`file-${id}`}>
          Subir música
          <Icon src='/icons/upload-song.svg' />
        </Button>
      </InputGroup>
      <Input type="file" id={`file-${id}`} onChange={onChange} />
    </Fragment>
  );
}

function UploaddedSongButton({ onChange, id, file }) {
  return (
    <Fragment>
      <UploaddedButton htmlFor={`file-${id}`}>
        { file.name }
        <Icon src="/icons/green-check.svg" />
      </UploaddedButton>
      <Input onChange={onChange} type="file" id={`file-${id}`} />
    </Fragment>
  );
}

const fileShape = {
  name: PropTypes.string,
};

UploadSongButton.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

UploaddedSongButton.propTypes = {
  id: PropTypes.string.isRequired.isRequired,
  file: PropTypes.shape(fileShape).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default (props) => {
  const { file } = props;
  return file ? UploaddedSongButton(props) : UploadSongButton(props);
};
