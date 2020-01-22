import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../../../settings/colors';
import Store from '../../../../store/Store';


const Container = styled.div`
  width: 100%;
  display: ${(props) => {
    const { display } = props;
    return display ? 'block' : 'none';
  }};
  `;

const FormContainer = styled.form`
  width: 100%;
  margin-top: -90px;

  @media (min-width: 768px) {
    display: inline-block;
    width: calc(100% - 404px);
    max-width: 400;
    margin-top: 0px;
    vertical-align: middle;
  }
`;

const Title = styled.h1`
  color: ${white};
  font-size: 3em;
  line-height: 1.20833333333em;
  font-weight: 400;
  max-width: 230px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Instructions = styled.p`
  color: ${white};
  font-size: 0.8em;
  font-weight: 300;
  line-height: 1.em;
  width: 100%;
  display: inline;

  & + & {
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ExitArrow = styled.img`
  width: 22px;
  position: absolute;
  top: 15px;
  right: 30px;
  cursor: pointer;

  @media (min-width: 768px) {
    top: 30px;
  }
`;

const Icon = styled.img`
  width: 100%;
  max-width: 230px;
  display: block;
  position: relative;
  right: -40px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    display: inline-block;
    max-width: 400px;
    vertical-align: middle;
    right: 0px;
  }
`;

function renderTitle(title) {
  return (
    <Title>
      {title}
    </Title>
  );
}

function renderInstructions(instructions) {
  return instructions && instructions.map(
    instruction => <Instructions key={instruction}>{instruction}</Instructions>,
  );
}


function backToLogin(dispatch) {
  dispatch({ type: 'SHOW_LOGIN_MODAL' });
}

const Form = (props) => {
  const {
    title,
    instructions,
    showExitArrow,
    children,
    display = true,
  } = props;

  const { dispatch } = useContext(Store);
  return (
    <Container display={display.toString()}>
      {showExitArrow && <ExitArrow onClick={() => backToLogin(dispatch)} src="/icons/arrow_forward_left.svg" />}
      <Icon src="/icons/login.svg" />
      <FormContainer>
        {renderTitle(title)}
        {renderInstructions(instructions)}
        {children}
      </FormContainer>
    </Container>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  instructions: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  showExitArrow: PropTypes.bool,
  display: PropTypes.bool,
};

Form.defaultProps = {
  instructions: [''],
  showExitArrow: true,
  display: true,
};

export default Form;
