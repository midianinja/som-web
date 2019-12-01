import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputGroup from '../../../molecules/InputGroup';
import Input from '../../../atoms/Input';
import Loading from '../../../atoms/Loading.atom';
import { white, green } from '../../../../settings/colors';

const Title = styled.h2`
  color: ${white};
  font-size: 1.875em;
  line-height: 1.20833333333em;
  font-weight: 300;
  max-width: 200px;
  margin-bottom: 35px;
`;

const Label = styled.label`
  font-size: 0.8571428571em;
  font-weight: 300;
  line-height: 1.65em;
  color: ${white};
  margin-bottom: 20px;
`;

const Resend = styled.p`
  color: ${green};
  font-weight: 300;
  font-size: 0.7142857143em;
`;

const Bold = styled.strong`
  font-weight: 400;
  margin-left: 5px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  padding-top: 45px;
  text-align: center;
`;

const inputGroupStyle = `
  margin-bottom: 20px;
`;

const inputStyle = `
  height: 60px;
  margin-top: 45px;
  font-size: 2.25em;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.36em;
  :focus {
    margin-top: 45px;
  }
`;

function SentPhoneFieldset(code, setCode, resendClick, error, loading) {
  return (
    <Fragment>
      <Title>Confirmação enviada</Title>
      <Label>Insira aqui o código de seis digitos que enviamos pro seu celular:</Label>
      <Resend onClick={resendClick}>
        Não recebeu?
        <Bold>Reenviar SMS</Bold>
      </Resend>
      <InputGroup customStyle={inputGroupStyle} error={error.code}>
        {
          loading ? (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          ) : (
            <Input
              id="code"
              type="text"
              placeholder=""
              autoFocus
              customStyle={inputStyle}
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          )
        }
      </InputGroup>
    </Fragment>
  );
}

export default SentPhoneFieldset;
