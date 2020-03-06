import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const TooltipContainer = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border-radius: 10px;
  width: 100%;
  left: 0px;
  top: -30px;
  border-radius: 10px;
`;

const Content = styled.span`
  background-color: blue;
  position: absolute;
  padding: 5px 15px;
  border-radius: 10px;
  top: -12px;
  border-radius: 10px;
`;

export const Triangle = styled.span`
  position: relative;
  display: block;
  width: 30px;
  height: 15px;
  text-align: center;
  overflow: hidden;
  right: 3px;
  bottom: -9px;

  &:after {
    content: "";
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: blue;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.35);
    transform: rotate(45deg);
    bottom: 16px;
  }
`;

const Tooltip = ({ children, content }) => (
  <Container>
    <TooltipContainer>
      <Content>
        {content}
      </Content>
      <Triangle />
    </TooltipContainer>
    {children}
  </Container>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
};

export default Tooltip;
