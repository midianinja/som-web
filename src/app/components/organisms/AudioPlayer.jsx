import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayPauseButton from '../atoms/PlayPauseButton';
import AudioSlider from '../atoms/AudioSlider';
import { white30 } from '../../settings/colors';

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

function AudioPlayer({ album, title }) {
  return (
    <Wrapper>
      <Header>
        <PlayPauseButton />
        <Info>
          <Title>{title}</Title>
          <Album>{album}</Album>
        </Info>
        <AudioSlider min="0" max="10" />
      </Header>
    </Wrapper>
  );
}

AudioPlayer.propTypes = {
  title: PropTypes.string,
  album: PropTypes.string,
};

AudioPlayer.defaultProps = {
  title: 'Terra Barravento',
  album: 'TMJNT',
};

export default AudioPlayer;
