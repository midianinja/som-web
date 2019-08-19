import React from 'react';
import styled from 'styled-components';
import WhoIsSomCard from '../../../components/organisms/WhoIsSomCard';
import { white } from '../../../settings/colors';

const Container = styled.section`
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  transition: translateX(0);

  @media (min-width: 1024px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const Comments = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: stretch;
  }
`;

const Title = styled.h3`
  font-size: 1.375em;
  font-weight: 400;
  color: ${white};
  margin-bottom: 30px;
`;

const WhoIsSom = () => (
  <Container id="quem-esta-no-som">
    <Title>Quem já está no SOM</Title>
    <Comments>
      <WhoIsSomCard
        artist="Emicida"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula urna dolor, sed maximus libero volutpat nec. Fusce volutpat lacus vel erat accumsan dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula urna dolor, sed maximus libero volutpat nec. Fusce volutpat lacus vel erat accumsan dapibus."
      />
      <WhoIsSomCard
        artist="Gaby Amarantos"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula urna dolor, sed maximus libero volutpat nec. Fusce volutpat lacus vel erat accumsan dapibus."
      />
      <WhoIsSomCard
        artist="Caetano Veloso"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula urna dolor, sed maximus libero volutpat nec. Fusce volutpat lacus vel erat accumsan dapibus."
      />
      <WhoIsSomCard
        artist="Criolo"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula urna dolor, sed maximus libero volutpat nec. Fusce volutpat lacus vel erat accumsan dapibus."
      />
    </Comments>
  </Container>
);

export default WhoIsSom;
