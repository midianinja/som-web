import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 30px;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const Link = styled.a`
  & + & {
    margin-left: 15px;
  }
`;

const Social = styled.img`
  width: 30px;
  height: 30px;
`;

function Socials({
  facebook, instagram, twitter, spotify,
}) {
  return (
    <Wrapper>
      {
        facebook ? (
          <Link href={facebook} target="_blank" rel="noopener noreferrer">
            <Social src="/icons/facebook-white.svg" alt={facebook} />
          </Link>
        ) : null
      }
      {
        instagram ? (
          <Link href={instagram} target="_blank" rel="noopener noreferrer">
            <Social src="/icons/instagram-white.svg" alt={instagram} />
          </Link>
        ) : null
      }
      {
        twitter ? (
          <Link href={twitter} target="_blank" rel="noopener noreferrer">
            <Social src="/icons/twitter-white.svg" alt={twitter} />
          </Link>
        ) : null
      }
      {
        spotify ? (
          <Link href={spotify} target="_blank" rel="noopener noreferrer">
            <Social src="/icons/spotify-black.svg" alt={spotify} />
          </Link>
        ) : null
      }
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
  spotify: '',
};

export default Socials;
