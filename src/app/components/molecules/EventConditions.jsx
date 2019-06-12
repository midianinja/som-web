import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { white } from "../../settings/colors";
import EventCondition from "../atoms/EventCondition";

const Container = styled.div`
  width: 100%;
  font-size: 0.8571428571em;
  line-height: 1.5em;
  font-weight: 300;
  color: ${white};
  text-align: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Space = styled.div`
  width: 15px;
  height: 10px;
`;

const EventConditions = () => (
  <Container>
    <Row>
      <EventCondition />
      <Space />
      <EventCondition />
    </Row>
    <Row>
      <EventCondition />
      <Space />
      <EventCondition />
    </Row>
  </Container>
);

export default EventConditions;
