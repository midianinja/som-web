import React, { useContext } from 'react';
import styled from 'styled-components';
import SlimButton from '../../components/atoms/SlimButton';
import About from './components/About';
import Apresentation from './components/Apresentation';
import HowItsWork from './components/HowItsWork';
import Instructions from './components/Instructions';
import WhoIsSom from './components/WhoIsSom';
import OpenSource from './components/OpenSource';
import Newsletter from './components/Newsletter';
import Store from '../../store/Store';
import { purple } from '../../settings/colors';
import { blockBodyScroll } from '../../utilities/scroll';

const Page = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

const LoginButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1024px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  z-index: 11;

  @media (min-width: 1024px) {
    padding-top: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const loginButtonStyle = `
  font-size: 0.75em;
  height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  float: right;
`;

const PurpleWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${purple};
`;

const FiguresContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 992px;
  margin-left: auto;
  margin-right: auto;
`;

const FiguresContent = styled.div`
  width: 100%;
  position: relative;
  z-index: 12;
`;

const RedEllipse = styled.img`
  position: absolute;
  width: 144px;
  height: 144px;
  left: -30px;
  z-index: 11;
  
  @media (min-width: 768px) {
    left: 0px;
  }
`;

const YellowPolygon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 12%;
  top: -30px;
  z-index: 11;
`;

const GreenRectangle = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 10%;
  top: 24.5%;
  z-index: 11;

  @media (min-width: 768px) {
    right: 34.5%;
  }
`;

const BlueRectangle = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 10%;
  top: 29.5%;
  z-index: 11;

  @media (min-width: 768px) {
    top: 47.5%;
  }
`;

const RedPolygon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  right: -3%;  
  top: 67.5%;
  z-index: 11;
`;

const showLogin = (dispatch) => {
  blockBodyScroll();
  dispatch({ type: 'SHOW_LOGIN_MODAL' });
};

const showRegister = (dispatch) => {
  blockBodyScroll();
  dispatch({ type: 'SHOW_REGISTER_MODAL' });
};

const Home = () => {
  const { dispatch } = useContext(Store);
  return (
    <Page>
      <LoginButtonContainer>
        <SlimButton
          color="white"
          customStyle={loginButtonStyle}
          onClick={() => showLogin(dispatch)}
        >
          Fazer login
        </SlimButton>
      </LoginButtonContainer>
      <Apresentation onClick={() => showRegister(dispatch)} />
      <FiguresContainer>
        <RedEllipse src="/icons/red-ellipse.svg" />
        <YellowPolygon src="/icons/yellow-polygon.svg" />
        <GreenRectangle src="/icons/green-rectangle.svg" />
        <BlueRectangle src="/icons/blue-rectangle.svg" />
        <RedPolygon src="/icons/red-polygon.svg" />
        <FiguresContent>
          <HowItsWork />
          <Instructions />
        </FiguresContent>
      </FiguresContainer>
      <PurpleWrapper>
        <About />
        <WhoIsSom />
      </PurpleWrapper>
      <OpenSource />
      <Newsletter />
    </Page>
  );
};

export default Home;
