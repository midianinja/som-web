import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, white } from '../../settings/colors';
import EventCard from '../molecules/EventCard';

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Space = styled.div`
  height: 15px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
`;

const Title = styled.h2`
  margin-top: 20px;
  font-size: 1.2857142857em;
  font-weight: 400;
  line-height: 1.1em;
  text-align: left;
  color: ${white};
`;

const Link = styled.a`
  color: ${green};
  margin-left: 5px;
`;

const OtherEvents = ({ name, at }) => (
  <Container>
    <Header>
      <Title>
        {`Outros Eventos ${at}`}
        <Link href='#link'>{name}</Link>
      </Title>
    </Header>
    <Space />
    <EventCard />
    <Space />
    <EventCard />
  </Container>
);

export default OtherEvents;
