import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputGroup from '../../../molecules/InputGroup';
import Input from '../../../atoms/Input';
import PasswordInput from '../../../atoms/PasswordInput';
import { white } from '../../../../settings/colors';

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

function CreateAccountFieldset(username, setUsername, password, setPassword, error) {
  return (
    <Fragment>
      <Title>Criando sua conta no Som</Title>
      <InputGroup
        customStyle={inputGroupStyle}
        customLabelStyle={inputGroupLabelStyle}
        label="Nome de usuário"
        error={error.username}
      >
        <Input
          id="username"
          type="text"
          placeholder=""
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup
        customStyle={inputGroupStyle}
        customLabelStyle={inputGroupLabelStyle}
        label="Senha"
        error={error.password}
      >
        <PasswordInput
          id="password"
          placeholder=""
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </InputGroup>
    </Fragment>
  );
}

export default CreateAccountFieldset;
