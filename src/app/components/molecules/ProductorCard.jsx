import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { black, white, white30 } from '../../settings/colors';
import Avatar from '../atoms/Avatar.atom';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 420px;
  padding: 20px 15px;
  border-radius: 20px;
  background: ${white};
  border: 1px solid ${white30};
  text-align: left;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 55px;
  margin-right: 15px;
  text-align: center;
`;

const ProductorTitle = styled.span`
  margin-top: 10px;
  font-size: 0.8571428571em;
  width: 100%;
  color: ${black};
  font-size: 11px;
  font-weight: 300;
`;

const ProfileWrapper = styled.div`
  height: 100%;
`;

const ProductorName = styled.h3`
  font-size: 1.2857142857em;
  line-height: 1.2em;
  font-weight: 400;
`;

const ProductorCity = styled.h4`
  margin-top: 5px;
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.2em;
`;

const ProductorText = styled.p`
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.5em;
`;

const avatarStyle = `
  width: 55px;
  height: 55px;
`;

const ProductorCard = ({ productor, history }) => (
  <Container onClick={() => history.push(`/productor/${productor.id}`)}>
    <ImageWrapper>
      <Avatar customStyle={avatarStyle} src={productor.photo} />
      <ProductorTitle>Produtor</ProductorTitle>
    </ImageWrapper>
    <ProfileWrapper>
      <ProductorName>{productor.name}</ProductorName>
      {
        productor.location
          ? <ProductorCity>{`${productor.location.city}, ${productor.location.state}`}</ProductorCity>
          : null
      }
      <ProductorText>{productor.description}</ProductorText>
      {/*
        <FollowersAndFollowing
          nFollowers={productor.followers.length}
          nFollowing={productor.following.length}
        />
        <ButtonsWrapper>
        <PrimaryButton color='green'>seguir</PrimaryButton>
        <LinkButton customStyle="margin-left: 10px" color="black">ver mais eventos</LinkButton>
        </ButtonsWrapper>
      */}
    </ProfileWrapper>
  </Container>
);

const locationShape = {
  city: PropTypes.string,
  state: PropTypes.string,
};

const productorShape = {
  description: PropTypes.string,
  photo: PropTypes.string,
  location: PropTypes.shape(locationShape),
  name: PropTypes.string,
  followers: PropTypes.array,
  following: PropTypes.array,
};

const historyShape = {
  push: PropTypes.func,
};

ProductorCard.propTypes = {
  productor: PropTypes.shape(productorShape).isRequired,
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(ProductorCard);
