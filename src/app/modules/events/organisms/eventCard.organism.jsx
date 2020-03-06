import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Store from '../../store/Store';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;

  @media (min-width: 1024px) {
    padding-top: 30px;    
    padding-bottom: 30px;    
  }
  align-items: center;
`;

function EventCard({ customStyle }) {
  return (
    <Wrapper customStyle={customStyle} />
  );
}
EventCard.propTypes = {
  customStyle: PropTypes.string.isRequired,
  // logged: PropTypes.bool.isRequired,
};

export default EventCard;
