import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, purple, secondaryPurple } from '../../settings/colors';
import PrimaryButton from '../atoms/PrimaryButton';

const View = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${purple};
    color: ${white};
    text-align: center;
`;

const Space = styled.div`
    height: 43%;
    width: 100%;
`;

const Welcome = styled.div`
    width: 100%;
    height: 40px;
    font-size: 24px;
    line-height: 26px;
`;

const Name = styled.div`
    width: 100%;
    height: 60px;
    font-size: 48px;
    line-height: 48px;
`;

const Description = styled.div`
    width: 100%;
    height: 60px;
    font-size: 16px;
`;

const SpaceTwo = styled.div`
    width: 100%;
    height: calc(57% - 240px);
`;

const ConfirmationPage = ({ name }) => (
    <View>
        <Space />
        <Welcome> Seja bem vinda ao Som, </Welcome>
        <Name> {name} :)</Name>
        <SpaceTwo />
        <Description> Agora é só se inscrever nos eventos que quiser tocar</Description>
        <PrimaryButton color='secondaryPurple'> INSCREVER AGORA </PrimaryButton>
    </View>
);

export default ConfirmationPage;
