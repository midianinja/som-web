import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { purple, white } from '../../settings/colors';


const View = styled.div`
    width: 375px;
    height: 656px;
    background-color: ${purple};
    color: ${white};
    padding-top: 22px;
`;

const ContentWrapper = styled.div`
    width: 312px;
    height: 521px;
    margin-left: 29px;
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
 		</ContentWrapper>
 	</View> 
);
	

export default Files;