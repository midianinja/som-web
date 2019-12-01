import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MoreASongButton from '../../atoms/MoreASongButton';
import MySongCard from '../../organisms/MySongCard';
import { black, white } from '../../../settings/colors';
import { getBase64, uploadSongToStorage } from '../../../utilities/file.utils';

const Fieldset = styled.fieldset`
  padding: 30px;
  background-color: ${white};
`;

const SongsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const songCardStyle = `
  max-width: 350px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${black};
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

const renderSongs = (songs, setSongs, authId, titleBlurAction) => {
  const [loadings, setLoadinds] = useState({});
  const handleSongChange = async (event, index) => {
    const copySong = { ...songs[index] };
    const copySongs = [...songs];
    const file = event.target.files[0];
    const loadingsBasicCopy = JSON.parse(JSON.stringify(loadings));
    loadingsBasicCopy[index] = { total: file.size, loaded: 0, isLoading: true };
    setLoadinds(loadingsBasicCopy);
    copySong.file = file;
    copySong.title = file.name.replace('.mp3', '');
    copySongs[index] = copySong;
    setSongs(copySongs);

    const updateProgress = ({ total, loaded }) => {
      const loadingsCopy = JSON.parse(JSON.stringify(loadings));
      loadingsCopy[index] = { total, loaded, isLoading: total !== loaded };
      setLoadinds(loadingsCopy);
    };

    try {
      const file64 = await getBase64(file);
      const uploadedSong = await uploadSongToStorage({ file: file64, id: authId, updateProgress });
      copySong.file = file;
      copySong.title = file.name.replace('.mp3', '').replace('_', ' ');
      copySong.url = uploadedSong.data.data.link;
      copySongs[index] = copySong;
      setSongs(copySongs);
    } catch (err) {
      throw err;
    }
  };

  const handleTitleChange = (event, index) => {
    const copySong = { ...songs[index] };
    const copySongs = [...songs];
    copySong.title = event.target.value;
    copySongs[index] = copySong;
    setSongs(copySongs);
  };

  const onBlurTitle = (event, index) => {
    const copySong = { ...songs[index] };
    titleBlurAction({ song: copySong, id: authId });
  };

  return songs.map((song, key) => {
    const index = key;
    return (
      <MySongCard
        customStyle={songCardStyle}
        key={index}
        handleSongChange={handleSongChange}
        handleTitleChange={handleTitleChange}
        loading={loadings[index] || {}}
        titleBlurAction={onBlurTitle}
        song={song}
        index={index}
      />
    );
  });
};

const UploadSongs = ({
  songs, setSongs, authId,
  titleBlurAction,
}) => {
  const handleAddSong = () => {
    const copySongs = [...songs];
    copySongs.push({ ...initialSong });
    setSongs(copySongs);
  };

  return (
    <Fieldset>
      <Title>Músicas</Title>
      <SongsWrapper>
        {renderSongs(songs, setSongs, authId, titleBlurAction)}
      </SongsWrapper>
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
  songs: PropTypes.arrayOf(PropTypes.shape(songShape)).isRequired,
  setSongs: PropTypes.func.isRequired,
  titleBlurAction: PropTypes.func.isRequired,
  authId: PropTypes.string.isRequired,
};

export default UploadSongs;
