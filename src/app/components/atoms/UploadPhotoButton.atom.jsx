import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white30, white } from '../../settings/colors';

const IconBigContainer = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${white30};
`;

const IconSmallContainer = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: ${white};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
`;

const SmallIcon = styled.img`
  width: 15px;
  height: 15px;
  vertical-align: middle;
`;

const UploadPhotoButton = (props) => {
  const { type } = props;
  if (type === 'small') {
    return (
      <IconSmallContainer {...props}>
        <SmallIcon src='/icons/photo.svg' />
      </IconSmallContainer>
    );
  }
  return (
    <IconBigContainer {...props}>
      <Icon src='/icons/photo_plus.svg' />
    </IconBigContainer>
  );
};

UploadPhotoButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default UploadPhotoButton;
