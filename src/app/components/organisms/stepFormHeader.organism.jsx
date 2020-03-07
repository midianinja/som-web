import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonHeader from './Header';
import { magenta, white } from '../../settings/colors';

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 15px;
  background-color: ${({ color }) => color};
  z-index: 10;
  max-height: 400px;
`;

const Title = styled.h1`
  font-size: 1.25em;
  line-height: 1.1818181818em;
  margin-top: 40px;
  font-weight: 400;
  letter-spacing: 0.16px;

  @media (min-width: 768px) {
    margin-top: 35px;
  }

  ${props => props.customStyle}
`;

const Body = styled.div`
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  color: ${white};
`;

const Text = styled.h3`
  max-height: ${(props) => {
    const { small } = props;
    return !small ? '100px' : '0px';
  }};
  opacity: ${(props) => {
    const { small } = props;
    return !small ? '1' : '0';
  }};
  margin-top: ${(props) => {
    const { small } = props;
    return !small ? '12px' : '0px';
  }};
  margin-bottom: ${(props) => {
    const { small } = props;
    return !small ? '15px' : '0px';
  }};
  width: 100%;
  color: ${white};
  font-size: 0.8125em;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  font-weight: 300;
  transition-duration: 0.6s;
  will-change: transform;
`;

const StepFormHeader = (props) => {
  const [small, setSmall] = useState(0);
  const { items, index } = props;

  useEffect(() => {
    window.document.addEventListener('scroll', (event) => {
      setSmall(event.target.documentElement.scrollTop > 0);
    });
  }, []);

  return (
    <Header {...props}>
      <CommonHeader />
      {/* <IndexContainer>{renderBall(props)}</IndexContainer> */}
      <Body>
        <Title>{items[index].title}</Title>
        <Text small={small}>{items[index].description}</Text>
      </Body>
    </Header>
  );
};

const itemShape = {
  title: PropTypes.string.isRequired,
  small: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
};

StepFormHeader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemShape)).isRequired,
  index: PropTypes.string.isRequired,
  customStyle: PropTypes.string.isRequired,
  color: PropTypes.string,
};

StepFormHeader.defaultProps = {
  color: magenta,
};

export default StepFormHeader;
