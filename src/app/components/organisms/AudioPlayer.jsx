import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayPauseButton from '../atoms/PlayPauseButton';
import AudioSlider from '../atoms/AudioSlider';
import {
  white10, white30, purple, white,
} from '../../settings/colors';

const TooltipContainer = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  right: 85px;
  top: -4px;
  border-radius: 10px;

  @media (max-width: 1024px) {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
  }
  ${props => (
    !props.show
      ? `
        display: none;   
      ` : null
  )}
`;

const Content = styled.div`
  background-color: ${purple};
  position: absolute;
  padding: 5px 15px;
  top: -21px;
  width: 105px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  @media (max-width: 1024px) {
    width: 100px;
    position: relative;
    justify-content: space-arround;
    top: 1px;
    right: auto;
    width: 100%;
  }
`;

export const Triangle = styled.span`
  position: relative;
  display: block;
  width: 30px;
  height: 15px;
  text-align: center;
  overflow: hidden;
  right: 3px;
  bottom: -9px;

  &:after {
    content: "";
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background:  ${purple};
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.35);
    transform: rotate(45deg);
    bottom: 16px;
  }
  @media (max-width: 1024px) {
    position: absolute;
    right: 77px;
    bottom: -16px;
  }
  ${props => (
    !props.show
      ? `
        display: none;   
      ` : null
  )}
`;

const Wrapper = styled.div`
  width: 100%;
  ${props => props.customStyle}

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
  ${props => props.customStyle}
`;

const Track = styled.li.attrs({ className: 'track' })`
  width: 100%;
  display: block;
  border-top: solid 0.5px ${white10};
  position: relative;
  
  transition-duration: 2s;
  transition-property: auto;
  
  :hover + .track {
    border-top: none;
  }
`;

const TrackContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: ${white10};
    border-radius: 40px;
    border-top: none;
  }
  
`;

const TrackText = styled.input`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 0.7142857143em;
  color: ${white}
  font-weight: 300;
  ${props => (props.disabled ? '' : `
    border-bottom: 1px solid ${white};
    :focus {
      border-bottom: 1px solid ${white};
    }
  `)}
`;

const TrackInfo = styled.div`
  align-items: center;
`;

const TrackTime = styled.label`
  font-size: 0.8571428571em;
  font-weight: 300;
`;

const TrackLikedIcon = styled.img`
  width: 20px;
  height: 14px;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: -2px;
`;
const TrackEditIcon = styled.img`
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 10px;
  margin-top: -2px;
  cursor: pointer;
`;

const TooltipIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;

  ${props => (props.show ? '' : 'display: none;')}
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

function renderTracks(tracks, handleClick, deleteAction, editAction, isUserArtist) {
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');

  const editAct = async ({ id }) => {
    await editAction({ id, name });
    setSelected('');
  };
  const deleteAct = async ({ id }) => {
    await deleteAction({ id });
    setSelected('');
  };

  return tracks.map(({
    id, title, liked, time,
  }, index) => (
    <Track onClick={() => handleClick(tracks[index])}>
      <TooltipContainer show={id === selected}>
        <Content onClick={e => e.stopPropagation()}>
          <TooltipIcon show={!name} onClick={() => setName(title)} src="/icons/edit-white.svg" />
          <TooltipIcon show={!name} onClick={() => deleteAct({ id })} src="/icons/trash.svg" />
          <TooltipIcon show={!!name} onClick={() => editAct({ id })} src="/icons/check-green.svg" />
          <TooltipIcon show onClick={() => { setSelected(''); setName(''); }} src="/icons/close-white.svg" />
        </Content>
        <Triangle show={id === selected} />
      </TooltipContainer>
      <TrackContainer>
        <TrackText
          value={id === selected && name ? name : title}
          onChange={({ target }) => setName(target.value)}
          disabled={!(id === selected && name)}
        />
        <TrackInfo>
          {
            isUserArtist
              ? (
                <TrackEditIcon
                  onClick={(e) => { e.stopPropagation(); setSelected(selected === id ? '' : id); setName(''); }}
                  src="/icons/tool.svg"
                />
              ) : null
          }
          <TrackLikedIcon src={liked ? '/icons/star_outlined.svg' : '/icons/star.svg'} />
          <TrackTime>{secondToMinute(time)}</TrackTime>
        </TrackInfo>
      </TrackContainer>
    </Track>
  ));
}

const handlePlayPause = (setPlay, play) => {
  if (!AUDIO_ELEMENT) return;
  if (play) {
    AUDIO_ELEMENT.pause();
    setPlay(false);
  } else {
    AUDIO_ELEMENT.play();
    setPlay(!play);
  }
};

function AudioPlayer({
  tracks, isUserArtist, deleteAction, editAction,
  customStyle, customListStyle, color, color15, color50,
  playPress,
}) {
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

    if (isAudio && AUDIO_ELEMENT) {
      setPlay(false);
      AUDIO_ELEMENT.pause();
    }

    if (selectSong) loadingSong(isAudio ? cb : () => null);
  }, [selectSong]);

  useEffect(() => {
    if (playPress && AUDIO_ELEMENT) {
      setPlay(false);
      AUDIO_ELEMENT.pause();
    }
  }, [playPress]);

  useEffect(() => {
    const mapSongs = async () => {
      const songsDataPromise = track => new Promise((resolve) => {
        AUDIO_ELEMENT = null;
        const audioFakeElement = new Audio();
        audioFakeElement.onloadedmetadata = (data) => {
          const metadata = {
            id: track.id,
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
      if (AUDIO_ELEMENT) handlePlayPause(setPlay, true);
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
    <Wrapper customStyle={customStyle}>
      <Header>
        <TrackHeaderWrapper>
          <PlayPauseButton
            color={color}
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
          color15={color15}
          color50={color50}
          color={color}
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
      <List customStyle={customListStyle}>
        {
          renderTracks(songs, setSelectSong, deleteAction, editAction, isUserArtist)
        }
      </List>
    </Wrapper>
  );
}

const trackShape = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.number,
};

AudioPlayer.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape(trackShape)),
  isUserArtist: PropTypes.bool,
  customStyle: PropTypes.string,
  customListStyle: PropTypes.string,
  color: PropTypes.string,
  color15: PropTypes.string,
  color50: PropTypes.string,
  playPress: PropTypes.string,
};

AudioPlayer.defaultProps = {
  isUserArtist: false,
  tracks: [],
  customStyle: '',
  customListStyle: '',
  color: '',
  color15: '',
  color50: '',
  playPress: '',
};

export default AudioPlayer;
