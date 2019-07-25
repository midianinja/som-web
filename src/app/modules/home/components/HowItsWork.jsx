import React, { useState } from 'react';
import styled from 'styled-components';
import HowItsWorkCard from '../../../components/organisms/HowItsWorkCard';
import { white, white50 } from '../../../settings/colors';

const Container = styled.section`
  position: relative;
  padding-top: 60px;
  padding-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 1.375em;
  text-align: center;
  font-weight: 300;
  line-height: 1.1em;
  color: ${white};
  margin-bottom: 30px;

  @media (min-width: 1024px) {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
`;

const Content = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  &::-webkit-scrollbar { width: 0 !important }
`;

const ScrollIndicatorWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const scrollLineWidth = 120;
const scrollIndicatorWidth = 48;

const ScrollIndicator = styled.div`
  position: relative;
  display: inline-block;
  width: ${scrollLineWidth}px;
  height: 2px;
  background-color: ${white50};
  border-radius: 2px;
  
  :before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    transition-duration: 0.5s;
    transform: translateX(${({ position, scrollWidth }) => (
    ((scrollLineWidth - scrollIndicatorWidth) * position / scrollWidth) + 2.5
  )}px);
    will-change: transform;
    width: ${scrollIndicatorWidth}px;
    height: 6px;
    background-color: ${white};
    border-radius: 6px;
  }
`;

const HowItsWork = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  return (
    <Container>
      <Title>Como funciona o SOM?</Title>
      <Content
        onScroll={(e) => {
          setScrollPosition(e.target.scrollLeft);
          setScrollWidth(e.target.scrollWidth - (document.documentElement.clientWidth - 30));
        }}
      >
        <HowItsWorkCard
          icon="/icons/home-ida.svg"
          title="Crie sua IDa"
          description="IDa é a sua identidade digital. Através dela você tem acesso à rede SOM além de outras plataformas."
          number="1"
        />
        <HowItsWorkCard
          icon="/icons/home-subscribe-band.svg"
          title="Inscreva sua banda"
          description="Encontre produtores e festivais e inscreva-se em oportunidades."
          number="2"
        />
        <HowItsWorkCard
          icon="/icons/home-world.svg"
          title="Circule o mundo"
          description="Faça uma turnê e espalhe o seu som!"
          number="3"
        />
      </Content>
      <ScrollIndicatorWrapper>
        <ScrollIndicator
          position={scrollPosition}
          scrollWidth={scrollWidth}
        />
      </ScrollIndicatorWrapper>
    </Container>
  );
};

export default HowItsWork;
