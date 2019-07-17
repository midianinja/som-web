import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getGradient } from '../../settings/gradients';

const Wrapper = styled.div`
  display: inline-block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: ${getGradient()};
  ${(props) => props.customStyle}
`;

const PreLoaderImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: ${(props) => {
    console.log('');
    return !props.src ? 0 : 1;
  }}
  object-fit: cover;
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 0.5s; 
`;

/**
 * function that loading image before render
 * @void
 * @param {string} src image source to be loading
 */
function load(src, callback) {
  const image = new Image();

  image.onload = () => {
    callback(src);
  };

  image.src = src;
}

/**
 * function that render react component
 * @param {object} props component props
 * @returns contains Avatar Component
 */
function Avatar(props) {
  const [loaddedSrc, setLoaddedSrc] = useState(null);
  const { src, alt, title, customStyle } = props;

  useEffect(() => {
    load(src, setLoaddedSrc);
  });

  return (
    <Wrapper customStyle={customStyle}>
      <PreLoaderImage src={loaddedSrc} alt={alt} title={title} />
    </Wrapper>
  );
}

Avatar.propTypes = {
  alt: PropTypes.string,
  customStyle: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
};

Avatar.defaultProps = {
  alt: '',
  customStyle: '',
  title: '',
  src: '',
};

export default Avatar;
