import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { magenta, white } from '../../settings/colors';
import LinkButton from '../atoms/LinkButton';

const imgSize = 'calc(33.33vw - 20px)';

const Container = styled.div`
	padding: 10px 40px;
`;

const Row = styled.div`
	background-color: Magenta;
	display: flex;
`;

const Title = styled.h3`
	font-weight: 400;
	line-height: 1em;
	color: ${white};
	text-align: left;
	margin-bottom: 15px;
`;

const Img = styled.img`
	width: ${imgSize};
	height: ${imgSize};
	background-color: blue;
`;

const InstagramMedia = () => (
	<Container>
		<Title> Instagram </Title>
		<Row> <Img /><Img /><Img /></Row>
		<Row> <Img /><Img /><Img /></Row>
		<Row> <Img /><Img /><Img /></Row>
		<LinkButton color="white"> Abrir Instagram </LinkButton>
	</Container>
);

export default InstagramMedia;