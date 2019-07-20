import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PreLoaderImage = styled.img`
  ${(props) => {
    const { width } = props;
    return width ? `width: ${width};` : '';
  }}
  ${(props) => {
    const { height } = props;
    return height ? `height: ${height};` : '';
  }}
  opacity: ${(props) => {
    const { src } = props;
    return !src ? 0 : 1;
  }}
  transition-property: opacity;
  transition-duration: 1s;
  transition-delay: 0.5s; 

  ${(props) => props.customStyle}
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
 * @returns contains ProgressiveImage Component
 */
function ProgressiveImage(props) {
  const [loaddedSrc, setLoaddedSrc] = useState(null);
  const { src, alt, title, width, height, customStyle } = props;

  useEffect(() => {
    load(src, setLoaddedSrc);
  });

  return (
    <PreLoaderImage width={width} height={height} src={loaddedSrc} alt={alt} title={title} customStyle={customStyle} />
  );
}

ProgressiveImage.propTypes = {
  alt: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  customStyle: PropTypes.string,
};

ProgressiveImage.defaultProps = {
  alt: '',
  height: '',
  title: '',
  src: '',
  width: '',
  customStyle: '',
};

export default ProgressiveImage;
