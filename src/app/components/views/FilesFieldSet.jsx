import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { purple, white, tertiaryBlack } from '../../settings/colors';

import UploadFile from '../molecules/UploadFile';


const View = styled.div`
    width: 100%;
    min-height: 656px;
    background-color: ${tertiaryBlack};
    color: ${white};
    padding-top: 22px;
    padding-left: 20px;
    padding-right: 20px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 521px;
`;

const Title = styled.div`
    width: 100%;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
`;

const Subtitle = styled.div`
	width: 100%;
	heigth: 48px;
	font-size: 16px;
	line-height: 26px;
	margin-top: 10px;
`;

const Files = () => (
 	<View>
 		<ContentWrapper>
 			<Title> Arquivos </Title>
 			<Subtitle> Documentos básicos para inscrição em qualquer evento do SOM</Subtitle>
 			<UploadFile title="Mapa de palco" subtitle="Com esse desenho fica mais fácil saber a posição de todos equipamentos no palco" type="Mapa"  />
 			<UploadFile title="Rider técnico" subtitle="Essa é a lista técnica de todos os equipamentos necessários para o show" type="Rider"  />
 			<UploadFile title="Press Kit" subtitle="Esse é seu kit para a mídia: conte sua história, mostre quem você é e o que falam de você" type="Kit"  />
 		</ContentWrapper>
 	</View> 
);
	

export default Files;