import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';
import LinkButton from '../atoms/LinkButton';
import ProgresiveImage from '../atoms/ProgressiveImage.atom';

const imgSize = 'calc(33.33vw - 26.6666666667px)';

const Container = styled.div`
  margin-top: 20px;
  padding: 10px 40px;
`;

const Row = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-weight: 400;
  line-height: 1em;
  color: ${white};
  text-align: left;
  margin-bottom: 15px;
`;

const InstagramMedia = ({ images }) => (
  <Container>
    <Title> Instagram </Title>
    <Row>
      <ProgresiveImage src={images[0]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[1]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[2]} width={imgSize} height={imgSize} />
    </Row>
    <Row>
      <ProgresiveImage src={images[3]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[4]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[5]} width={imgSize} height={imgSize} />
    </Row>
    <Row>
      <ProgresiveImage src={images[6]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[7]} width={imgSize} height={imgSize} />
      <ProgresiveImage src={images[8]} width={imgSize} height={imgSize} />
    </Row>
    <LinkButton color='white'> Abrir Instagram </LinkButton>
  </Container>
);

InstagramMedia.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.required),
};

InstagramMedia.defaultProps = {
  images: [],
};

export default InstagramMedia;
