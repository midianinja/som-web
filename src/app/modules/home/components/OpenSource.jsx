import React from 'react';
import styled from 'styled-components';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import { white, white50, secondaryBlack } from '../../../settings/colors';

const Container = styled.section`
  background-color: ${secondaryBlack};
  padding-top: 30px;
  padding-bottom: 45px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = styled.header`
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const Figure = styled.img`
  width: 140px;
  margin-right: 15px;
`;

const TextWrapper = styled.div``;

const Title = styled.h3`
  font-size: 1.875em;
  line-height: 1.2em;
  color: ${white};
  font-weight: 400;
  text-align: left;
`;

const Span = styled.span`
  font-size: 0.75em;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  text-align: left;
  color: ${white50};
  margin-bottom: 5px;
`;

const GitHubIcon = styled.img`
  width: 20px;
  margin-left: 30px;
  vertical-align: middle;
`;

const buttonStyle = `
  display: block;
  width: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  height: 38px;
  font-weight: 400;
  font-size: 1em;
  margin-top: 30px;
`;

const OpenSource = () => (
  <Container>
    <Header>
      <Figure
        src="/icons/open-source.svg"
        alt="Diminuir as distâncias e democratizar as oportunidades"
      />
      <TextWrapper>
        <Span>Além de tudo isso</Span>
        <Title>O Som é Software Livre</Title>
      </TextWrapper>
    </Header>
    <PrimaryButton
      onClick={() => {
        window.open('https://github.com/midianinja/som-web', '_blank');
      }}
      customStyle={buttonStyle}
      color="darkGray"
    >
      Contribuir
      <GitHubIcon src="/icons/github.svg" />
    </PrimaryButton>
  </Container>
);

export default OpenSource;
