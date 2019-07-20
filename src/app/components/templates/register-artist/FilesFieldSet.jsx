import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../../settings/colors';

import UploadFile from '../../molecules/UploadFile';

const View = styled.div`
  width: 100%;
  min-height: 656px;
  background-color: ${white};
  color: ${black};
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  ${(props) => props.customStyle}
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 521px;
`;

const Title = styled.h2`
  width: 100%;
  height: 20px;
  font-size: 1.4285714286rem;
  font-weight: 400;
  line-height: 1em;
  margin-bottom: 15px;
`;

const Subtitle = styled.h3`
  width: 100%;
  heigth: 48px;
  font-size: 1em;
  line-height: 1.5em;
  font-weight: 300;
`;

const Files = ({ customStyle, handleFileChange, artist }) => (
  <View customStyle={customStyle}>
    <ContentWrapper>
      <Title> Arquivos </Title>
      <Subtitle> Documentos básicos para inscrição em qualquer evento do SOM</Subtitle>
      <UploadFile
        title='Mapa de palco'
        subtitle='Com esse desenho fica mais fácil saber a posição de todos equipamentos no palco'
        type='Mapa'
        accept='.pdf'
        handleFileChange={(e) => handleFileChange(e, 'mapa', artist)}
      />
      <UploadFile
        title='Rider técnico'
        subtitle='Essa é a lista técnica de todos os equipamentos necessários para o show'
        type='Rider'
        accept='.pdf'
        handleFileChange={(e) => handleFileChange(e, 'rider', artist)}
      />
      <UploadFile
        title='Press Kit'
        subtitle='Esse é seu kit para a mídia: conte sua história, mostre quem você é e o que falam de você'
        type='Kit'
        accept='.pdf'
        handleFileChange={(e) => handleFileChange(e, 'kit', artist)}
      />
    </ContentWrapper>
  </View>
);

Files.propTypes = {
  customStyle: PropTypes.string,
  handleFileChange: PropTypes.func.isRequired,
  artist: PropTypes.string.isRequired,
};

Files.defaultProps = {
  customStyle: '',
};

export default Files;
