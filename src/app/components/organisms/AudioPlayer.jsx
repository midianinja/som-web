import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayPauseButton from '../atoms/PlayPauseButton';
import AudioSlider from '../atoms/AudioSlider';
import { white10, white30 } from '../../settings/colors';

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding-left: 45px;
  padding-right: 45px;
  text-align: left;
`;

const Info = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  max-width: calc(100% - 70px);
`;

const Title = styled.h3`
  font-size: 1em;
  font-weight: 400;
  margin-bottom: 3px;
`;

const Album = styled.h4`
  font-size: 0.7142857143em;
  font-weight: 400;
  color: ${white30};
`;

const List = styled.ul`
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
`;

const Track = styled.li.attrs({ className: 'track' })`
  width: 100%;
  height: 48px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 0.5px ${white10};

  :hover {
    background-color: ${white10};
    border-radius: 40px;
    border-top: none;
  }

  :hover + .track {
    border-top: none;
  }
`;

const TrackText = styled.h4`
  height; 100%;
  display: flex;
  align-items: center;
  font-size: 0.7142857143em;
  font-weight: 300;
`;

const TrackInfo = styled.div`
  margin-top: -5px;
`;

const TrackTime = styled.label`
  font-size: 0.8571428571em;
  font-weight: 300;
`;

const TrackLikedIcon = styled.img`
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: -2px;
`;

const TrackHeaderWrapper = styled.div`
  display: block;
`;

function secondToMinute(time) {
  const minutes = parseInt(time / 60, 10);
  const seconds = parseInt(time % 60, 10);
  return `${minutes}:${seconds}`;
}

function renderTracks(tracks, handleClick) {
  return tracks.map(({ title, liked, time }, index) => (
    <Track onClick={() => handleClick(tracks[index])}>
      <TrackText>{title || `Faixa ${index + 1}`}</TrackText>
      <TrackInfo>
        <TrackLikedIcon src={liked ? '/icons/star_outlined.svg' : '/icons/star.svg'} />
        <TrackTime>{secondToMinute(time)}</TrackTime>
      </TrackInfo>
    </Track>
  ));
}

const handlePlayPause = (setPlay, play, audio) => {
  if (play) audio.pause();
  else audio.play();

  setPlay(!play);
};

function AudioPlayer({ tracks }) {
  const [play, setPlay] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectSong, setSelectSong] = useState({});
  const [audio, setAudio] = useState(false);
  const [audioStatus, setAudioStatus] = useState('stopped');
  const [currentTime, setCurrentTime] = useState(0);

  const loadingSong = () => {
    setAudioStatus('loading');
    const audioElement = new Audio();

    audioElement.onloadstart = () => {
      setAudio(audioElement);
    };

    audioElement.ontimeupdate = (event) => {
      setCurrentTime(event.target.currentTime);
      setAudioStatus('loadded');
    };

    audioElement.src = selectSong.url;
    audioElement.load();
  };

  useEffect(() => {
    loadingSong();
  }, [selectSong]);

  useEffect(() => {
    const mapSongs = async () => {
      const songsDataPromise = track => new Promise((resolve) => {
        const audioElement = new Audio();
        audioElement.onloadedmetadata = (data) => {
          const metadata = {
            url: track.url,
            title: track.title,
            time: data.target.duration,
            liked: false,
            algum: '-',
          };

          resolve(metadata);
        };

        audioElement.src = track.url;
        audioElement.load();
      });

      const promises = tracks.map(songsDataPromise);
      const newSongs = await Promise.all(promises);
      setSelectSong(newSongs[0] || {});
      setSongs(newSongs);
    };

    mapSongs();
  }, [tracks]);

  const currentRangeValue = currentTime && audio.duration
    ? Math.floor(currentTime / audio.duration * 1000) : 0;

  return (
    <Wrapper>
      <Header>
        <TrackHeaderWrapper>
          <PlayPauseButton
            ket={play}
            shouldPlay={play}
            onClick={() => handlePlayPause(setPlay, play, audio)}
          />
          <Info>
            <Title>{selectSong.title}</Title>
            <Album>{selectSong.album}</Album>
          </Info>
        </TrackHeaderWrapper>
        <AudioSlider
          id="audio-slider"
          value={currentRangeValue}
          defaultValue="0"
          onChange={(e) => {
            const time = e.target.value / 1000 * audio.duration;
            setCurrentTime(time);

            audio.currentTime = time;
            audio.play();
            setPlay(true);
          }}
          min="0"
          max="1000"
        />
      </Header>
      <List>{renderTracks(songs, setSelectSong)}</List>
    </Wrapper>
  );
}

const trackShape = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.number,
};

AudioPlayer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape(trackShape)),
};

AudioPlayer.defaultProps = {
  tracks: [],
};

export default AudioPlayer;
