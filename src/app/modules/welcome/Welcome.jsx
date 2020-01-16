import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import PrimaryButton from '../../components/atoms/PrimaryButton';
import { white, purple } from '../../settings/colors';
import { allowBodyScroll } from '../../utilities/scroll';

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
  const store = useContext(Store);
  const { history } = props;

  if (!store.state.auth) return null;
  return (
    <Wrapper>
      <Title>Seja bem vindx ao Som,</Title>
      <Name>{store.state.auth.username}</Name>
      <Footer>
        <Text>Conheça os eventos e inscreva-se</Text>
        <PrimaryButton
          onClick={() => {
            allowBodyScroll();
            history.push('/event/5e20ab89d06d378c52c00314');
          }}
          color="orange"
        >
          Ver eventos!
        </PrimaryButton>
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
