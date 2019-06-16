import React, { useState } from 'react';
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

const initialSong = {
  file: null,
  id: '',
  title: '',
  uri: '',
};

function renderSongs(songs) {
  return songs.map((song, key) => {
    const index = key + 1;
    return (
      <MySongCard key={index} song={song} index={index} />
    );
  });
}

const UploadSongs = () => {
  const [songs, setSongs] = useState([{ ...initialSong }]);
  const handleAddSong = () => {
    const copySongs = [...songs];
    copySongs.push({ ...initialSong });
    setSongs(copySongs);
  };

  return (
    <Fieldset>
      <Title>Músicas</Title>
      { renderSongs(songs) }
      <MoreASongButton onClick={handleAddSong} />
    </Fieldset>
  );
};

UploadSongs.propTypes = {

};

export default UploadSongs;
