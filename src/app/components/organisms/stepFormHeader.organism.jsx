import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommonHeader from './Header';
import { magenta, white, white30 } from '../../settings/colors';

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 30px;
  background-color: ${magenta};
  ${props => props.customStyle}
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
  ${props => props.customStyle}
`;

const MidBall = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${white};
  margin: 0 5px;
  border-radius: 50%;
  ${props => props.customStyle}
`;

const SmallBall = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${white};
  margin: 0 5px;
  border-radius: 50%;
  ${props => props.customStyle}
`;

const Title = styled.h1`
  font-size: 1.5714285714em;
  line-height: 1.1818181818em;
  margin-top: 22px;
  font-weight: 400;
  color: ${white};
  letter-spacing: 0.16px;
  ${props => props.customStyle}
`;

const Body = styled.div`
  width: 100%;
  color: ${white};
  ${props => (props.small ? 'padding-top: 30px;' : '')}
`;

const Text = styled.h3`
  width: 100%;
  color: ${white};
  font-size: 0.8571428571rem;
  letter-spacing: 0.16px;
  line-height: 1.5384615385em;
  font-weight: 300;
  margin-top: 22px;
  ${props => props.customStyle}
`;

const smallTitleStyle = `
  font-size: 0.8571428571rem;
  margin: 0;
`;

const renderBall = ({ items, index, small }) => items.map((e, i) => {
  if (index === i) return <BigBall small={small} />;
  if (index + 1 === i || index - 1 === i) return <MidBall small={small} />;
  return <SmallBall small={small} />;
});

const StepFormHeader = (props) => {
  const { items, index, small } = props;
  return (
    <Header {...props}>
      <CommonHeader />
      <IndexContainer>{renderBall(props)}</IndexContainer>
      <Body small={small}>
        <Title
          customStyle={small ? smallTitleStyle : ''}
        >
          {items[index].title}
        </Title>
        { small ? null : (<Text>{items[index].description}</Text>)}
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
};

export default StepFormHeader;
