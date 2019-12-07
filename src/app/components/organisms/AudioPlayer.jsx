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

let AUDIO_ELEMENT = null;

const TrackHeaderWrapper = styled.div`
  display: block;
`;

function secondToMinute(time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

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

const handlePlayPause = (setPlay, play) => {
  if (play) {
    AUDIO_ELEMENT.pause();
    setPlay(false);
  } else {
    AUDIO_ELEMENT.play();
    setPlay(!play);
  }
};

function AudioPlayer({ tracks }) {
  const [play, setPlay] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectSong, setSelectSong] = useState(null);
  const [audioStatus, setAudioStatus] = useState('stopped');
  const [currentTime, setCurrentTime] = useState(0);

  const loadingSong = (cb) => {
    setAudioStatus('loading');
    AUDIO_ELEMENT = new Audio();
    AUDIO_ELEMENT.onloadstart = () => {
      setAudioStatus('loadded');
      cb();
    };

    AUDIO_ELEMENT.ontimeupdate = (event) => {
      setCurrentTime(event.target.currentTime);
    };

    AUDIO_ELEMENT.src = selectSong.url;
    AUDIO_ELEMENT.load();
  };

  useEffect(() => {
    const isAudio = !!AUDIO_ELEMENT;
    const cb = () => {
      setPlay(true);
      AUDIO_ELEMENT.play();
    };

    if (isAudio) {
      setPlay(false);
      AUDIO_ELEMENT.pause();
    }

    if (selectSong) loadingSong(isAudio ? cb : () => null);
  }, [selectSong]);

  useEffect(() => {
    const mapSongs = async () => {
      const songsDataPromise = track => new Promise((resolve) => {
        const audioFakeElement = new Audio();
        audioFakeElement.onloadedmetadata = (data) => {
          const metadata = {
            url: track.url,
            title: track.title,
            time: data.target.duration,
            liked: false,
            algum: '-',
          };

          resolve(metadata);
        };

        audioFakeElement.src = track.url;
        audioFakeElement.load();
      });

      const promises = tracks.map(songsDataPromise);
      const newSongs = await Promise.all(promises);

      setSongs(newSongs);
      setSelectSong(newSongs[0]);
    };

    mapSongs();
  }, [tracks]);

  const currentRangeValue = currentTime && AUDIO_ELEMENT && AUDIO_ELEMENT.duration
    ? Math.floor(currentTime / AUDIO_ELEMENT.duration * 1000) : 0;

  const song = {
    title: 'Nenhuma seleção.',
    album: 'Sem albúm.',
    url: '',
    ...(selectSong || {}),
  };
  return (
    <Wrapper>
      <Header>
        <TrackHeaderWrapper>
          <PlayPauseButton
            ket={play}
            shouldPlay={play}
            onClick={() => handlePlayPause(setPlay, play)}
          />
          <Info>
            <Title>{song.title}</Title>
            <Album>{song.album}</Album>
          </Info>
        </TrackHeaderWrapper>
        <AudioSlider
          id="audio-slider"
          value={currentRangeValue}
          defaultValue="0"
          onChange={(e) => {
            if (!AUDIO_ELEMENT) return;

            const time = e.target.value / 1000 * AUDIO_ELEMENT.duration;
            setCurrentTime(time);

            AUDIO_ELEMENT.currentTime = time;
            AUDIO_ELEMENT.play();
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
