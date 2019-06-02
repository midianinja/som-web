import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white30 } from '../../settings/colors';

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

const Uploader = styled.label`
  width: 120px;
  height: 120px;
  background-color: ${white30};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  align-self: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Input = styled.input`
  display: none;
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
 * @returns contains UploadAvatar Component
 */
function UploadAvatar(props) {
  const [loaddedSrc, setLoaddedSrc] = useState(null);
  const { src, alt, title } = props;

  useEffect(() => {
    load(src, setLoaddedSrc);
  });

  if (!src) {
    return (
      <Fragment>
        <Uploader htmlFor="uploader-input">
          <Icon src="/icons/add_a_photo.png" />
        </Uploader>
        <Input type="file" id="uploader-input" />
      </Fragment>
    );
  }

  return <PreLoaderImage src={loaddedSrc} alt={alt} title={title} />;
}

UploadAvatar.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
};

UploadAvatar.defaultProps = {
  alt: '',
  title: '',
  src: '',
};

export default UploadAvatar;
