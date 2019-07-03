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
  margin-bottom: 20px;
`;

const EventConditions = () => (
  <Container>
    <EventCondition title="Transporte" condition="directions-car" />
    <EventCondition title="Acomodações" condition="hotel" checked />
    <EventCondition title="Alimentacção" condition="local-dining" checked />
  </Container>
);

export default EventConditions;
