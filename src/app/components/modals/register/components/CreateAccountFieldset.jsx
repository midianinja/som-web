import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import InputGroup from '../../../molecules/InputGroup';
import Input from '../../../atoms/Input';
import PasswordInput from '../../../atoms/PasswordInput';
import {
  white, transparent, secondaryRed, secondaryYellow, terciaryGreen,
} from '../../../../settings/colors';
import { getPasswordPoint } from '../validations';

const Title = styled.h2`
  color: ${white};
  font-size: 2em;
  line-height: 1.20833333333em;
  font-weight: 300;
  max-width: 200px;
  margin-bottom: 30px;
`;

const inputGroupLabelStyle = `
  color: ${white};
  font-weight: 300;
`;

const inputGroupStyle = `
  margin-bottom: 20px;
`;

function getColor(point) {
  if (point <= 0) return transparent;
  if (point < 60) return secondaryRed;
  if (point < 90) return secondaryYellow;
  return terciaryGreen;
}

function CreateAccountFieldset(
  username, setUsername, password, setPassword, parentError,
) {
  const errorColor = `color: ${getColor(getPasswordPoint(password))};`;
  return (
    <Fragment>
      <Title>Criando sua conta no Som</Title>
      <InputGroup
        customStyle={inputGroupStyle}
        customLabelStyle={inputGroupLabelStyle}
        label="Nome de usuário"
        error={parentError.username}
      >
        <Input
          id='username'
          type='text'
          placeholder=''
          value={username}
          onChange={setUsername}
        />
      </InputGroup>
      <InputGroup
        customStyle={inputGroupStyle}
        customLabelStyle={inputGroupLabelStyle}
        customErrorStyle={errorColor}
        label="Senha"
        error={parentError.password}
      >
        <PasswordInput
          id="password"
          placeholder=""
          value={password}
          onChange={setPassword}
          point={getPasswordPoint(password)}
        />
      </InputGroup>
    </Fragment>
  );
}

export default CreateAccountFieldset;
