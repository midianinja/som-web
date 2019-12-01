import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 20px;

  @media (min-width: 1024px) {
    text-align: left;
    margin-left: 30px;
  }
`;

const Social = styled.img`
  margin: 10px;
  width: 30px;
  height: 30px;
`;

function Socials({ facebook, instagram, twitter, spotify }) {
  return (
    <Wrapper>
      <a href={facebook} target="_blank" rel="noopener noreferrer">
        <Social src="/icons/facebook-white.svg" alt={facebook} />
      </a>
      <a href={instagram} target="_blank" rel="noopener noreferrer">
        <Social src="/icons/instagram-white.svg" alt={instagram} />
      </a>
      <a href={twitter} target="_blank" rel="noopener noreferrer">
        <Social src="/icons/twitter-white.svg" alt={twitter} />
      </a>
      <a href={spotify} target="_blank" rel="noopener noreferrer">
        <Social src="/icons/spotify-black.svg" alt={spotify} />
      </a>
    </Wrapper>
  );
}

Socials.propTypes = {
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  twitter: PropTypes.string,
  spotify: PropTypes.string,
};

Socials.defaultProps = {
  facebook: '',
  instagram: '',
  twitter: '',
};

export default Socials;
