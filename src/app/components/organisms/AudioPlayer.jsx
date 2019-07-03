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
  display: 100%;
  padding-left: 45px;
  padding-right: 45px;
  text-align: left;
`;

const Info = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
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

function secondToMinute(seconds) {
  const minutes = (seconds / 60).toFixed(2).toString();
  return minutes.replace('.', ':');
}

function renderTracks(tracks) {
  return tracks.map(({ title, liked, time }, index) => (
    <Track>
      <TrackText>{title || `Faixa ${index + 1}`}</TrackText>
      <TrackInfo>
        <TrackLikedIcon src={liked ? '/icons/star_outlined.svg' : '/icons/star.svg'} />
        <TrackTime>{secondToMinute(time)}</TrackTime>
      </TrackInfo>
    </Track>
  ));
}

function AudioPlayer({ tracks }) {
  return (
    <Wrapper>
      <Header>
        <PlayPauseButton />
        <Info>
          <Title>{tracks[0].title}</Title>
          <Album>{tracks[0].album}</Album>
        </Info>
        <AudioSlider min='0' max='10' />
      </Header>
      <List>{renderTracks(tracks)}</List>
    </Wrapper>
  );
}

const trackShape = {
  title: PropTypes.string,
  album: PropTypes.string,
  time: PropTypes.number,
  liked: PropTypes.bool,
};

AudioPlayer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape(trackShape)),
};

AudioPlayer.defaultProps = {
  tracks: [
    {
      title: 'Terra Barravento',
      album: 'TMJNT',
      time: 340,
      liked: false,
    },
    {
      title: 'Lua em Gêmeos',
      album: 'TMJNT',
      time: 204,
      liked: true,
    },
    {
      title: 'Reunião',
      album: 'TMJNT',
      time: 354,
      liked: false,
    },
    {
      title: 'Agradeço ao povo brasileiro',
      album: 'TMJNT',
      time: 340,
      liked: false,
    },
    {
      title: 'Reunião',
      album: 'TMJNT',
      time: 420,
      liked: true,
    },
  ],
};

export default AudioPlayer;
