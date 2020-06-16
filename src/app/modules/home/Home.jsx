import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import SlimButton from '../../components/atoms/SlimButton';
// import About from './components/About';
import Apresentation from './components/Apresentation';
import HowItsWork from './components/HowItsWork';
import Instructions from './components/Instructions';
// import WhoIsSom from './components/WhoIsSom';
import OpenSource from './components/OpenSource';
import Newsletter from './components/Newsletter';
import Store from '../../store/Store';
import { purple, secondaryBlack, darkGray } from '../../settings/colors';
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
  display: flex;
  justify-content: center;
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

const TermsWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${secondaryBlack};
  text-align: center;
`;

const Terms = styled.a`
  width: 100%;
  font-size: 1em;
  line-height: 1em;
  font-weight: 300;
  text-decoration: underline;
  display: block;
  color: ${darkGray};
  cursor: pointer;

  &:hover {
    color: ${purple}; 
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

const Home = ({ history }) => {
  const { state, dispatch } = useContext(Store);
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
      <Apresentation
        onClick={() => {
          if (state.auth) {
            history.push('/event/5e20ab89d06d378c52c00314');
          } else {
            showRegister(dispatch);
          }
        }}
      />
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
        <object
          title="Midia"
          width="560"
          height="315"
          DATA="https://www.youtube.com/watch?v=bTUoq_zt2uM"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
      </PurpleWrapper>
      <OpenSource />
      <Newsletter />
      <TermsWrapper>
        <Terms
          onClick={() => {
            window.open(
              'https://s3-sa-east-1.amazonaws.com/festivalninja.org/img/termos-de-use-e-politicas-de-privacidade-som.pdf',
              '_blank',
            );
          }}
        >
          Termos de uso e políticas de privacidade
        </Terms>
      </TermsWrapper>
    </Page>
  );
};

const historyShape = {
  push: PropTypes.func.isRequired,
};

Home.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(Home);
