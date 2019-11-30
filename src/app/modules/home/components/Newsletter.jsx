import React from 'react';
import styled from 'styled-components';
// import NewsletterInput from '../../../components/atoms/NewsletterInput';
import { theBestColor, secondaryBlack } from '../../../settings/colors';

const Container = styled.section`
  background-color: ${secondaryBlack};
  padding: 30px 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

// const Title = styled.h3`
//   font-size: 1.875em;
//   line-height: 1.2em;
//   color: ${black};
//   font-weight: 400;
//   text-align: left;
//   margin-bottom: 20px;
// `;

// const Description = styled.h4`
//   font-size: 1em;
//   font-weight: 300;
//   letter-spacing: 0.16px;
//   line-height: 1.5384615385em;
//   text-align: left;
//   color: ${black};
//   margin-bottom: 25px;
// `;

// const Logo = styled.img`
//   width: 80px;
//   margin-bottom: 20px;
// `;

// const FireIcon = styled.img`
//   position: relative;
//   width: 24px;
//   margin-left: 5px;
//   top: -2px;
//   vertical-align: middle;
// `;

const SocialList = styled.div`
  text-align: center;
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
      {/* <Logo src="/icons/gray-logo.svg" />
      <Title>
        Não paramos por aqui
        <FireIcon src="/icons/fire.svg" />
      </Title>
      <Description>
        O Som está em desenvolvimentos! Insira seu e-mail para receber novidades
      </Description>
      <NewsletterInput
        placeholder="Insira seu e-mail"
      /> */}
      <SocialList>
        <Social href="https://www.facebook.com/sompontovc">
          <SocialIcon src="/icons/facebook-white.svg" alt="Acesse o Sistema Operacional da Música no Facebook" />
        </Social>
        <Social href="https://www.instagram.com/som.vc">
          <SocialIcon src="/icons/instagram-white.svg" alt="Acesse o Sistema Operacional da Música no Instagram" />
        </Social>
        <Social href="https://twitter.com/sompontovc">
          <SocialIcon src="/icons/twitter-white.svg" alt="Acesse o Sistema Operacional da Música no Twitter" />
        </Social>
      </SocialList>
    </Content>
  </Container>
);

export default OpenSource;
