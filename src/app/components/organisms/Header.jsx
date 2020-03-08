import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';
import Store from '../../store/Store';
import { blockBodyScroll } from '../../utilities/scroll';

const HeaderComponent = styled.header`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  z-index: 20;
  padding-left: 15px;  
  padding-right: 15px;

  @media (min-width: 1024px) {
    padding-left: 0px;    
    padding-right: 0px;    
  }
  ${props => props.customStyle}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;

  @media (min-width: 1024px) {
    padding-top: 30px;    
    padding-bottom: 30px;    
  }
  align-items: center;
`;

const Logo = styled.img`
  height: 15px;
  cursor: pointer;

  @media (min-width: 1024px) {
    height: 20px;
  }
`;

const BurgerButton = styled.div`
  width: 22px;
  cursor: pointer;
  
  ${(props) => {
    const { hide } = props;
    return hide ? 'display: none;' : '';
  }}
`;

const Line = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${white};

  & + & {
    margin-top: 4px;
  }
`;

function Header({ customStyle }) {
  const { state, dispatch } = useContext(Store);

  return (
    <HeaderComponent customStyle={customStyle}>
      <Wrapper>
        <Logo src="/images/logo.svg" alt="SOM - Sistema Operacional da Música" />
        <BurgerButton
          hide={!state.auth}
          onClick={() => {
            blockBodyScroll();
            dispatch({ type: 'SHOW_NAVIGATION_MODAL' });
          }}
        >
          <Line />
          <Line />
          <Line />
        </BurgerButton>
      </Wrapper>
    </HeaderComponent>
  );
}
Header.propTypes = {
  customStyle: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default Header;
