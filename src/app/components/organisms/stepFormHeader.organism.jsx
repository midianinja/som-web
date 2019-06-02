import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  magenta, white, white30,
} from '../../settings/colors';

const Header = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 30px;
    background-color: ${magenta};
`;

const Logo = styled.label`
  color: ${white30};
  margin-bottom: 30px;
`;

const IndexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${white30};
`;

const BigBall = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${white};
  margin: 0 5px;
  border-radius: 50%;
`;

const MidBall = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${white};
  margin: 0 5px;
  border-radius: 50%;
`;

const SmallBall = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${white};
  margin: 0 5px;
  border-radius: 50%;
`;

const Title = styled.h1`
  font-size: 1.5714285714em;
  margin-top: 22px;
  font-weight: 400;
  color: ${white};
  letter-spacing: 0.16px;
`;

const Body = styled.div`
  width: 100%;
  color: ${white};
`;

const Text = styled.h3`
  width: 100%;
  color: ${white};
  font-size: 0.8571428571rem;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  font-weight: 300;
  margin-top: 22px;
`;

const renderBall = ({ items, index }) => items.map((e, i) => {
  if (index === i) return (<BigBall />);
  if (index + 1 === i || index - 1 === i) return (<MidBall />);
  return (<SmallBall />);
});

const StepFormHeader = (props) => {
  const { items, index } = props;
  return (
    <Header {...props}>
      <Logo>LOGO</Logo>
      <IndexContainer>
        {renderBall(props)}
      </IndexContainer>
      <Body>
        <Title>
          {items[index].title}
        </Title>
        <Text>
          {items[index].description}
        </Text>
      </Body>
    </Header>
  );
};


const itemShape = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

StepFormHeader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemShape)).isRequired,
  index: PropTypes.string.isRequired,
};

export default StepFormHeader;
