import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { black15, white } from '../../settings/colors';

const Card = styled.div`
  display: inline-block;
  width: 250px;
  border-radius: 20px;
  overflow: hidden;
  vertical-align: top;
  
  & + & {
    margin-left: 15px;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(79, 79, 79, 0.7);
    filter: blur(65px);
  }
`;

const Icon = styled.img`
  width: 75px;
  z-index: 11;
`;

const Content = styled.div`
  position: relative;
  background-color: ${white};
  height: 135px;
  padding: 20px;
  padding-top: 30px;

  @media (min-width: 1024px) {
    height: 165px;
  }
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 1.2857142857em;
  margin-bottom: 15px;
`;

const Number = styled.span`
  position: absolute;
  font-size: 1.875em;
  font-weight: 700;
  color: ${black15};
  top: 15px;
  right: 15px;
`;

const Description = styled.p`
  font-size: 0.875em;
  font-weight: 300;
  line-height: 1.5384615385em;
  white-space: normal;
`;

function HowItsWorkCard({
  icon, title, number, description,
}) {
  return (
    <Card>
      <IconWrapper>
        <Icon src={icon} alt={title} />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Number>{number}</Number>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
}

HowItsWorkCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HowItsWorkCard;
