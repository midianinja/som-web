import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PreLoaderImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: ${(props) => {
    console.log(props);
    return (!props.src ? 0 : 1);
  }}
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
  const { src, alt, title } = props;

  useEffect(() => {
    load(src, setLoaddedSrc);
  });

  return <PreLoaderImage src={loaddedSrc} alt={alt} title={title} />;
}

Avatar.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
};

Avatar.defaultProps = {
  alt: '',
  title: '',
  src: '',
};

export default Avatar;
