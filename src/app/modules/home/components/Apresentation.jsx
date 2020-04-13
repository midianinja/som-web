import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import { white } from '../../../settings/colors';

const zindex = 10;

const HomeWrapper = styled.section`
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
    background: linear-gradient(179.99deg, #000000 1.58%, rgba(0, 0, 0, 0.33) 37.1%, #000000 100%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    top: 0;
    left: 0;
    z-index: ${zindex};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  z-index: ${zindex + 1}; 
`;


const Content = styled.div`
  width: 100%;
  max-width: 320px;
  margin-top: 45px;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 320px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.875em;
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

const Home = ({ onClick }) => (
  <HomeWrapper>
    <Wrapper>
      <Content>
        <Logo src="/images/colorful-logo.svg" alt="Som, Sistema Operacional da Música" />
        <Title>Sistema Operacional da Músicaa</Title>
        <Description>
          A plataforma para aceleração de oportunidades da música brasileira
        </Description>
        <PrimaryButton
          onClick={onClick}
          customStyle={buttonStyle}
        >
          Inscrever-se
        </PrimaryButton>
      </Content>
    </Wrapper>
  </HomeWrapper>
);

Home.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Home;
