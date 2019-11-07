import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import { white, purple } from '../../settings/colors';

const Wrapper = styled.section`
  position: relative;
  display: flex;
  background-color: ${purple};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: ${white};
  text-align: center;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Name = styled.h2`
  font-size: 3em;
  font-weight: 400;
  margin-bottom: 30px;

  @media (min-width: 1024px) {
    font-size: 3.2em;
  }
`;

const Text = styled.p`
  font-size: 0.875em;
  font-weight: 300;
  line-height: 1.625em;
  margin-bottom 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

const Footer = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 30px;
  left: 0;
  text-align: center;
`;

function Welcome(props) {
  console.log('props: ', props);
  const store = useContext(Store);
  console.log('store: ', store);
  const { history } = props;
  return (
    <Wrapper>
      <Title>Seja bem vinda ao Som,</Title>
      <Name>{store.state.auth.username}</Name>
      <Footer>
        <Text>Agora é só se inscrever nos eventos que quiser tocar</Text>
        <PrimaryButton onClick={() => history.push('/register-artist')} color="orange">Inscrever agora!</PrimaryButton>
      </Footer>
    </Wrapper>
  );
}

const historyShape = {
  push: PropTypes.func,
};

Welcome.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(Welcome);
