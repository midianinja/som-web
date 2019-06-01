import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green, white } from '../../settings/colors';

const Container = styled.div`
	width: 100%;
	height: 280px;
	border-radius: 20px;
	background: #FFFFFF;
	border: 1px solid #F2F2F2;
	box-sizing: border-box;
	border-radius: 20px;
	display: flex;
	padding: 35px 17px;
`;

const ImageWrapper = styled.div`
	width: 60px;
	height: 100px;
	background-color: magenta;
	margin-right: 18px;
	text-align: center;
`;

const Image = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: yellow;
`;

const ProductorTitle = styled.div`
	width: 100%;
	color: black;
	font-size: 11px;
`;

const ProfileWrapper = styled.div`
	width: calc(100% - 100px);
`;

const ProductorName = styled.div`
	font-size: 1.5em;
	line-height: 1.2em;
`;

const ProductorPlace = styled.div`
	margin-top: 5px;
	font-size: 1em;
	line-height: 1.2em; 

`;

const ProductorCard = () => (
	<Container>
		<ImageWrapper>
		<Image />
		<ProductorTitle> Produtor </ProductorTitle>
		</ImageWrapper>
		<ProfileWrapper>
			<ProductorName> Augusto Fernando </ProductorName>
			<ProductorPlace> Rio de Janeiro, RJ </ProductorPlace>

		</ProfileWrapper>
	</Container>
);

export default ProductorCard;

