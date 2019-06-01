import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black03, white                    } from '../../settings/colors';

const IconBigContainer = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color:  ${black03};
`;

const IconSmallContainer = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color:  ${white};
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
      <IconBigContainer {...props}>
        <Icon
          src="/icons/photo_plus.svg"
        />
      </IconBigContainer>
    );
  }
  return (
    <IconSmallContainer {...props}>
      <SmallIcon
        src="/icons/photo_plus.svg"
      />
    </IconSmallContainer>
  );
};

UploadPhotoButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default UploadPhotoButton;
