import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, white } from '../../settings/colors';
import FollowersAndFollowing from '../atoms/FollowersAndFollowing';
import PrimaryButton from '../atoms/PrimaryButton';
import LinkButton from '../atoms/LinkButton';

const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  padding: 35px 17px;
`;

const ImageWrapper = styled.div`
  width: 55px;
  margin-right: 15px;
  text-align: center;
`;

const Image = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: gray;
`;

const ProductorTitle = styled.div`
  margin-top: 5px;
  width: 100%;
  color: black;
  font-size: 11px;
`;

const ProfileWrapper = styled.div`
  height: 100%;
`;

const ProductorName = styled.div`
  font-size: 1.5em;
  line-height: 1.2em;
`;

const ProductorCity = styled.div`
  margin-top: 5px;
  font-size: 1em;
  line-height: 1.2em;
`;

const ProductorText = styled.div`
  margin-top: 15px;
  font-size: 1em;
  line-height: 1.2em;
  height: 80px;
`;

const Space = styled.div`
  height: 20px;
  font-size: 1em;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  heigth: 30px;
  display: flex;

  margin-top: 20px;
`;

const HSpace = styled.div`
  width: 10px;
  heigth: 100%;
`;

const ProductorCard = () => (
  <Container>
    <ImageWrapper>
      <Image />
      <ProductorTitle> Produtor </ProductorTitle>
    </ImageWrapper>
    <ProfileWrapper>
      <ProductorName> Augusto Fernando </ProductorName>
      <ProductorCity> Rio de Janeiro, RJ </ProductorCity>
      <ProductorText>
        {' '}
        O produtor musical mais sinistro da cena. Mais de 500 festivais realizados nos 11 anos de carreira.
      </ProductorText>
      <Space />
      <FollowersAndFollowing />
      <ButtonsWrapper>
        <PrimaryButton color='green'>seguir</PrimaryButton>
        <HSpace />
        <LinkButton color='black'> ver mais eventos</LinkButton>
      </ButtonsWrapper>
    </ProfileWrapper>
  </Container>
);

export default ProductorCard;
