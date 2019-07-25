import React from 'react';
import styled from 'styled-components';
import { white, black15 } from '../../../settings/colors';

const Container = styled.section`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.header`
  text-align: center;
`;

const Figure = styled.img`
  width: 240px;
  vertical-align: middle;
`;

const TitleContainer = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    display: inline-block;
    width: calc(100% - 240px);
    vertical-align: middle;
  }
`;

const Title = styled.h4`
  font-size: 1.75em;
  line-height: 1.2em;
  color: ${white};
  font-weight: 400;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
`;

const Description = styled.h3`
  font-size: 0.75em;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  text-align: left;
  color: ${white};
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 30px;
`;

const Video = styled.div`
  width: 100%;
  height: calc(100vw / 375 * 220);
  max-height: 380px;
  background-color: ${black15};

  @media (min-width: 1024px) {
    margin-bottom: 60px;
    box-shadow: 0px 50px 80px rgba(0, 0, 0, 0.35);
  }
`;

const About = () => (
  <Container>
    <Header>
      <Figure
        src="/icons/about.svg"
        alt="Diminuir as distâncias e democratizar as oportunidades"
      />
      <TitleContainer>
        <Title>Diminuir as distâncias e democratizar as oportunidades</Title>
        <Description>
          Conheça as tecnologias que foram desenvolvidas para o SOM
        </Description>
      </TitleContainer>
    </Header>
    <Video />
  </Container>
);

export default About;
