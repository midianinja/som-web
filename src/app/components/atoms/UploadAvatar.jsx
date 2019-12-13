import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white30 } from '../../settings/colors';

const PreLoaderImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  opacity: ${props => (!props.src ? 0 : 1)};
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
function UploadAvatar({
  src, alt, title, handleChange,
}) {
  const [loaddedSrc, setLoaddedSrc] = useState(null);

  useEffect(() => {
    load(src.url, setLoaddedSrc);
  });

  const emptyImage = <Icon src="/icons/add_a_photo.png" />;
  const image = <PreLoaderImage src={loaddedSrc} alt={alt} title={title} />;

  return (
    <Fragment>
      <Uploader onChange={handleChange} htmlFor="uploader-avatar-artist-form-input">
        {src.url ? image : emptyImage}
      </Uploader>
      <Input onChange={handleChange} type="file" id="uploader-avatar-artist-form-input" />
    </Fragment>
  );
}

UploadAvatar.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

UploadAvatar.defaultProps = {
  alt: '',
  title: '',
  src: '',
};

export default UploadAvatar;
