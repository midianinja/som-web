import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, purple } from '../../settings/colors';

const View = styled.div`
    width: 100vw;
    heigth: 100vh;
    background-color: ${purple};
    color: ${white};
`;

const ConfirmatationPage = ({ name }) => <View />;

export default ConfirmationPage;
