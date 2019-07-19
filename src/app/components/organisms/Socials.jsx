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

function Socials({ facebook, instagram, twitter }) {
  return (
    <Wrapper>
      <a href={facebook}>
        <Social src='/icons/facebook-white.svg' alt={facebook} />
      </a>
      <a href={instagram}>
        <Social src='/icons/instagram-white.svg' alt={instagram} />
      </a>
      <a href={twitter}>
        <Social src='/icons/twitter-white.svg' alt={twitter} />
      </a>
    </Wrapper>
  );
}

Socials.propTypes = {
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  twitter: PropTypes.string,
};

Socials.defaultProps = {
  facebook: '',
  instagram: '',
  twitter: '',
};

export default Socials;
