import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, black } from '../../settings/colors';

import LinkButton from '../atoms/LinkButton';
import EventDate from '../atoms/EventDate';
import EventPlace from '../atoms/EventPlace';

import PrimaryButton from '../atoms/PrimaryButton';


const Container = styled.div`
	width: 100%;
	height: auto;
	display: flex;
`;

const EventImage = styled.img`
	width: 120px;
	height: 120px;
	background-color: yellow;
`;

const EventInfoWrapper = styled.div`
	height: 100%;
	padding-left: 15px;
`;

const Space = styled.div`
  height: 5px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;


const Eventcard = () => (
	<Container>
		<EventImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CWoKE-mVXIuUoOHd0cZx__NYhHOhw_ncXWa5aLGmgYgXK2bceQ" />
		<EventInfoWrapper>
		<LinkButton fontSize="xlarge" size="small" color="green">Nome do Festival</LinkButton>
    <EventDate />
    <EventPlace
      city='Rio de Janeiro'
      state='RJ'
    />
    <Space />	
    <ButtonWrapper>
      <PrimaryButton>Quero me inscrever</PrimaryButton>
    </ButtonWrapper>

		</EventInfoWrapper>
	</Container>
);

export default Eventcard;