import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputGroup from '../../../molecules/InputGroup';
import Input from '../../../atoms/Input';
import { white } from '../../../../settings/colors';

const Title = styled.h2`
  color: ${white};
  font-size: 1.75em;
  line-height: 1.20833333333em;
  font-weight: 300;
  max-width: 200px;
  margin-bottom: 15px;
`;

const inputGroupStyle = `
  margin-bottom: 20px;
`;

function EmailFieldset(email, setEmail, error) {
  return (
    <Fragment>
      <Title>Qual seu e-mail?</Title>
      <InputGroup customStyle={inputGroupStyle} error={error.email}>
        <Input id='email' type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputGroup>
    </Fragment>
  );
}

export default EmailFieldset;
