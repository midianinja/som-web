import React from 'react';
import styled from 'styled-components';
import InstructionCard from '../../../components/organisms/InstructionCard';

const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 992px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 45px;
  text-align: center;
`;

const Instructions = () => (
  <Container>
    <InstructionCard
      icon="/icons/why-to-use.svg"
      title="Pra que posso usá-lo?"
      description="No SOM o produtor encontra artistas, os artistas encontram oportunidades e o público fica por dentro de tudo que está acontencendo"
    />
    <InstructionCard
      icon="/icons/to-artists.svg"
      title="Para artistas"
      description="Plataformas digitais integradas. Todo o trabalho do artista disponivel para produtores e público em um só lugar!"
    />
    <InstructionCard
      icon="/icons/music-brazil-map.svg"
      title="Mapa da Música"
      description="Coloque seu nome no mapa! Faça seu perfil e participa da construção de um novo mapa da música brasileira"
    />
    <InstructionCard
      icon="/icons/productors.svg"
      title="Para Produtores e Fãs"
      description="Em Breve!"
    />
  </Container>
);

export default Instructions;
