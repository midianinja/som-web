import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { green } from '../../settings/colors';
import EventDate from '../atoms/EventDate';
import EventPlace from '../atoms/EventPlace';

import PrimaryButton from '../atoms/PrimaryButton';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const EventImage = styled.img`
  width: 100px;
  height: 100px;
`;

const EventInfoWrapper = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 15px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const buttonCustomStyle = `
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 300;
`;

const Link = styled.a`
  color: ${green};
`;

const Eventcard = () => (
  <Container>
    <EventImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CWoKE-mVXIuUoOHd0cZx__NYhHOhw_ncXWa5aLGmgYgXK2bceQ' />
    <EventInfoWrapper>
      <Link href='link'>Nome do Festival</Link>
      <div>
        <EventDate />
        <EventPlace city='Rio de Janeiro' state='RJ' />
      </div>
      <ButtonWrapper>
        <PrimaryButton size='small' customStyle={buttonCustomStyle}>
          Quero me inscrever
        </PrimaryButton>
      </ButtonWrapper>
    </EventInfoWrapper>
  </Container>
);

export default Eventcard;
