import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../settings/colors';

const Card = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 275px;
  vertical-align: top;
  text-align: center;

  & + & {
    margin-top: 45px;
  }

  @media (min-width: 1024px) {
    width: 50%;
    max-width: 50%;
    margin-top: 45px;
  }
`;

const IconWrapper = styled.div`
  @media (min-width: 1024px) {
    display: inline-block;
    width: 120px;
    vertical-align: middle;
  }
`;

const Icon = styled.img`
  width: 150px;
`;

const Content = styled.div`
  margin-top: -23px;
  color: ${white};

  @media (min-width: 1024px) {
    display: inline-block;
    width: calc(100% - 180px);
    vertical-align: middle;
    text-align: left;
    margin-top: 0;
    padding-left: 15px;
    margin-left: 30px;
  }
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 1.2857142857em;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 0.875em;
  font-weight: 100;
  line-height: 1.5384615385em;
  white-space: normal;
`;

function InstructionCard({
  icon, title, description,
}) {
  return (
    <Card>
      <IconWrapper>
        <Icon src={icon} alt={title} />
      </IconWrapper>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Card>
  );
}

InstructionCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InstructionCard;
