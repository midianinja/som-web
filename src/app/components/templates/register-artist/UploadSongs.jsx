import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoreASongButton from '../../atoms/MoreASongButton';
import MySongCard from '../../organisms/MySongCard';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const initialSong = {
  file: null,
  id: '',
  title: '',
  uri: '',
};

function renderSongs(songs, setSongs) {
  const handleSongChange = (event, index) => {
    const copySong = { ...songs[index] };
    const copySongs = [...songs];
    const file = event.target.files[0];
    copySong.file = file;
    copySongs[index] = copySong;
    setSongs(copySongs);
  };

  return songs.map((song, key) => {
    const index = key;
    return (
      <MySongCard
        key={index}
        handleSongChange={handleSongChange}
        song={song}
        index={index}
      />
    );
  });
}

const UploadSongs = ({ songs, setSongs }) => {
  const handleAddSong = () => {
    const copySongs = [...songs];
    copySongs.push({ ...initialSong });
    setSongs(copySongs);
  };

  return (
    <Fieldset>
      <Title>Músicas</Title>
      { renderSongs(songs, setSongs) }
      <MoreASongButton onClick={handleAddSong} />
    </Fieldset>
  );
};

const songShape = {
  file: PropTypes.object,
  id: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
};

UploadSongs.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape(songShape)).isRequried,
  setSongs: PropTypes.func.isRequried,
};

export default UploadSongs;
