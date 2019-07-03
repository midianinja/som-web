import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';
import LinkButton from '../atoms/LinkButton';
import ProgresiveImage from '../atoms/ProgressiveImage.atom';

const imgStyle = `
  width: calc(33.33vw - 26.6666666667px);
  height: calc(33.33vw - 26.6666666667px);
  
  @media (min-width: 1024px) {
    width: calc(195px - 26.6666666667px);
    height: calc(195px - 26.6666666667px);
  }
`;

const Container = styled.div`
  margin-top: 30px;
  padding: 10px 40px;
`;

const Row = styled.div`
  display: flex;
`;

const MobileRow = styled.div`
  display: flex;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Title = styled.h3`
  font-weight: 400;
  line-height: 1em;
  color: ${white};
  text-align: left;
  margin-bottom: 20px;
`;

const InstagramMedia = ({ images }) => (
  <Container>
    <Title> Instagram </Title>
    <Row>
      <ProgresiveImage
        src={images[0]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[1]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[2]}
        customStyle={imgStyle}
      />
    </Row>
    <MobileRow>
      <ProgresiveImage
        src={images[3]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[4]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[5]}
        customStyle={imgStyle}
      />
    </MobileRow>
    <MobileRow>
      <ProgresiveImage
        src={images[6]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[7]}
        customStyle={imgStyle}
      />
      <ProgresiveImage
        src={images[8]}
        customStyle={imgStyle}
      />
    </MobileRow>
    <LinkButton color="white"> Abrir Instagram </LinkButton>
  </Container>
);

InstagramMedia.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.required),
};

InstagramMedia.defaultProps = {
  images: [],
};

export default InstagramMedia;
