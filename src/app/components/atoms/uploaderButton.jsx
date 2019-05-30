import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { white, purple, green, gray } from '../../settings/colors';

const Button = styled.div`
    background-color: ${purple};
    color: ${white};
    font-size: 0.8571428571em;
    text-align: center;
    width: 142px;
    height: 30px;
    border-radius: 30px;
    margin: 0;
    cursor: pointer;

    :active {
        background-color: ${green};
    }

    :focus {
        outline: none;
    }

    :disabled {
        background-color: ${gray};
        cursor: not-allowed;
    }
`;

const Title = styled.div`
    vertical-align: middle;
    display: inline-block;
    margin-right: 15px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    vertical-align: middle;
`;

const UploaderButton = ({ text, handleClick }) => {
    return (
        <Button onClick={handleClick}>
            <Title>Subir {text}</Title>

            <Icon src='/icons/upload.svg' />
        </Button>
    );
};

UploaderButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.string,
};

UploaderButton.defaultProps = {
    text: 'Label',
};

export default UploaderButton;
