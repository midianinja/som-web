import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UploadSongButton from '../atoms/UploadSongButton';
import Input from '../atoms/Input';
import { black, white10, white30 } from '../../settings/colors';

const Card = styled.div`
  margin-bottom: 30px;
`;
const LabelWrapper = styled.div`
  position: relative;
  
  :before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 100vw;
    height: 1px;
    background-color: ${white10};
    left: -30px;
    top: 7px;
  }
`;

const Label = styled.label`
  display: inline-block;
  font-size: 0.6428571429em;
  text-transform: uppercase;
  margin-bottom: 15px;
  letter-spacing: 2px;
  color: ${white30};
  position: relative;
  margin-left: 19px;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  background-color: ${black};
`;

const inputCustomStyle = `
  width: 100%;
`;

const MySongCard = ({ index }) => (
  <Card>
    <LabelWrapper>
      <Label>{`Faixa ${index}`}</Label>
    </LabelWrapper>
    <UploadSongButton />
    <Input
      placeholder="Nome da música"
      customStyle={inputCustomStyle}
    />
  </Card>
);

// const songShape = {
//   title: PropTypes.string.isRequired,
// };

MySongCard.propTypes = {
  index: PropTypes.number.isRequired,
  // song: PropTypes.shape(songShape).isRequired,
};

export default MySongCard;
