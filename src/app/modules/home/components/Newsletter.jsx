import React from 'react';
import styled from 'styled-components';
import NewsletterInput from '../../../components/atoms/NewsletterInput';
import { black, theBestColor } from '../../../settings/colors';

const Container = styled.section`
  background-color: ${theBestColor};
  padding: 30px 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h3`
  font-size: 1.875em;
  line-height: 1.2em;
  color: ${black};
  font-weight: 400;
  text-align: left;
  margin-bottom: 20px;
`;

const Description = styled.h4`
  font-size: 1em;
  font-weight: 300;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  text-align: left;
  color: ${black};
  margin-bottom: 25px;
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 20px;
`;

const FireIcon = styled.img`
  position: relative;
  width: 24px;
  margin-left: 5px;
  top: -2px;
  vertical-align: middle;
`;

const SocialList = styled.div`
  margin-top: 30px;
`;

const Social = styled.a`
  & + & {
    margin-left: 15px;
  }
`;

const SocialIcon = styled.img`
  width: 35px;
  height: 35px;
`;


const OpenSource = () => (
  <Container>
    <Content>
      <Logo src="/icons/gray-logo.svg" />
      <Title>
        Não paramos por aqui
        <FireIcon src="/icons/fire.svg" />
      </Title>
      <Description>
        O Som está em desenvolvimentos! Insira seu e-mail para receber novidades
      </Description>
      <NewsletterInput
        placeholder="Insira seu e-mail"
      />
      <SocialList>
        <Social href="#">
          <SocialIcon src="/icons/facebook-purple.svg" alt="" />
        </Social>
        <Social href="#">
          <SocialIcon src="/icons/instagram-purple.svg" alt="" />
        </Social>
        <Social href="#">
          <SocialIcon src="/icons/twitter-purple.svg" alt="" />
        </Social>
      </SocialList>
    </Content>
  </Container>
);

export default OpenSource;
