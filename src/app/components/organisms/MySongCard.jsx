import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div``;
const Label = styled.label``;

const MySongCard = ({ index }) => (
  <Card>
    <Label>{`Faixa ${index}`}</Label>
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
