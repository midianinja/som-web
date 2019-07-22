import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import { white } from '../../../settings/colors';

const Wrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding: 30px;
  background-image: url("/images/lp-background.jpg");
  background-size: 220%;
  background-position: top;

  @media (min-width: 1024px) {
    background-size: cover;
  }

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 101%;
    background: linear-gradient(179.99deg, #000000 1.58%, rgba(0, 0, 0, 0.33) 37.1%, #000000 85.8%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    top: 0;
    left: 0;
    z-index: 10;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 420px;
  z-index: 20; 
`;

const Logo = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.9375em;
  font-weight: 400;
  line-height: 1.2127659574em;
  color: ${white};
  margin-bottom: 20px;
`;

const Description = styled.h2`
  font-size: 1em;
  font-weight: 300;
  line-height: 1.625em;
  color: ${white};
  margin-bottom: 30px;
`;

const buttonStyle = `
  width: 100%;
  height: 38px;
  font-weight: 400;
`;

const Home = () => (
  <Wrapper>
    <Content>
      <Logo src="/images/colorful-logo.svg" alt="Som, Sistema Operacional da Música" />
      <Title>Sistema Operacional da Música</Title>
      <Description>O primeiro aplicativo para aceleração de oportunidades da música brasileira</Description>
      <PrimaryButton customStyle={buttonStyle}>Inscrever-se</PrimaryButton>
    </Content>
  </Wrapper>
);

export default Home;
