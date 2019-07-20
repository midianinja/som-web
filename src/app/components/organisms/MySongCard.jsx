import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UploadSongButton from '../atoms/UploadSongButton';
import Input from '../atoms/Input';
import { black, white, black07, green } from '../../settings/colors';

const Card = styled.div`
  margin-bottom: 30px;
`;
const LabelWrapper = styled.div`
  position: relative;

  :before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 100vw;
    height: 1px;
    background-color: ${white};
    left: -30px;
    top: 7px;
  }
`;

const Label = styled.label`
  display: inline-block;
  font-size: 0.6428571429em;
  text-transform: uppercase;
  margin-bottom: 10px;
  letter-spacing: 2px;
  color: ${black};
  position: relative;
  margin-left: 19px;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
`;

const LoadingWrapper = styled.label`
  position: relative;
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px ${green};
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
  border-radius: 38px;
`;

const LoadingProgress = styled.label`
  position: absolute
  width: 0;
  left: 0;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px ${green};
  color: ${black};
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 15px;
  border-radius: 38px;
  background-color: ${green};
  overflow: hidden;
  white-space: nowrap;
  ${(props) => `width: ${props.progess}%;`}
`;

const inputCustomStyle = `
  width: 100%;
  background-color: ${black07};
  color: ${black};
`;

const renderUploadButon = (song, index, handleSongChange) => (
  <UploadSongButton file={song.file} id={`track-${index + 1}`} onChange={(e) => handleSongChange(e, index)} />
);

const renderProgressBar = (loading, song) => (
  <LoadingWrapper>
    <LoadingProgress progess={(loading.loaded * 100) / loading.total}>{song.title}</LoadingProgress>
  </LoadingWrapper>
);

const MySongCard = ({ index, handleSongChange, handleTitleChange, song, titleBlurAction, loading }) => (
  <Card>
    <LabelWrapper>
      <Label>{`Faixa ${index + 1}`}</Label>
    </LabelWrapper>
    {loading.isLoading ? renderProgressBar(loading, song) : renderUploadButon(song, index, handleSongChange)}
    <Input
      value={song.title}
      onChange={(e) => handleTitleChange(e, index)}
      onBlur={(e) => titleBlurAction(e, index)}
      placeholder='Nome da música'
      customStyle={inputCustomStyle}
    />
  </Card>
);

const fileShape = {
  name: PropTypes.string,
};

const songShape = {
  title: PropTypes.string.isRequired,
  file: PropTypes.shape(fileShape).isRequired,
};

const loadingShape = {
  total: PropTypes.number.isRequired,
  loaded: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

MySongCard.propTypes = {
  index: PropTypes.number.isRequired,
  handleSongChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  titleBlurAction: PropTypes.func.isRequired,
  loading: PropTypes.shape(loadingShape).isRequired,
  song: PropTypes.shape(songShape).isRequired,
};

export default MySongCard;
