import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import InputGroup from '../../../molecules/InputGroup';
import InputWithTransparency from '../../../atoms/InputWithTransparency';
import RadioComponent from './RadioComponent';
import { white, white10 } from '../../../../settings/colors';
import { sendLink } from '../controller';


const Arrow = styled.img`
  width: 24px;
`;

const inputGroupStyle = `
  margim-bottom: 0px;
  margin-top: 10px;
`;

const inputWithTransparencyStyle = `
  margim-bottom: 0px;
  padding: 2px;
`;

const Wrapper = styled.div`
  margin-top: 30px;
`;

const ButtonWithIcon = styled.button`
  color: ${white}
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  background-color: ${white10};
  border-radius: 60px;
  padding: 0 10px 0 30px;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-top: 60px;
  }
`;

const LinkToModal = styled.a`
  text-decoration: none;
  color: ${white};
  font-size: 0.7142857143em;
  font-weight: 300;
  cursor: pointer;
`;

const title = 'Recuperar senha!';
const instructions = [
  'Insira o seu e-mail ou número do celular cadastrado no SOM.',
  'Vamos te enviar um link para gerar uma nova senha.',
];

function FormSendResetRequest(
  backToLogin, closeModal,
  inputDevice, error, setInputDevice, setError, setCurrentStep,
) {
  function handleInputChange(event) {
    const v = event.target.value;
    setError('');
    setInputDevice({
      ...inputDevice,
      currentInput: inputDevice.devices[inputDevice.currentOption].inputFunction(v),
    });
  }

  function handleRadioClick() {
    const { options, devices } = inputDevice;
    setInputDevice({
      ...inputDevice,
      options: [options[1], options[0]],
      currentInput: devices[inputDevice.currentOption].inputFunction(''),
      currentOption: options[1],
    });
  }

  const handleSendLinkClick = async (event) => {
    event.preventDefault();
    const wasSent = await sendLink(inputDevice.currentInput);
    setError(!wasSent.result ? wasSent.message : '');
    if (wasSent.result) setCurrentStep();
  };


  return (
    <Form title={title} instructions={instructions}>
      <Wrapper>
        <RadioComponent handleClick={handleRadioClick} checked={inputDevice.currentOption === 'mail'} />
        <InputGroup customStyle={inputGroupStyle} label=" " error={error}>
          <InputWithTransparency
            type="text"
            value={inputDevice.currentInput}
            placeholder={inputDevice.devices[inputDevice.currentOption].placeholder}
            onChange={event => handleInputChange(event)}
            customStyle={inputWithTransparencyStyle}
            maxLength={inputDevice.devices[inputDevice.currentOption].maxLength}
            autoComplete="off"
          />
        </InputGroup>
        <LinkToModal onClick={backToLogin}>
          Lembrei! Voltar ao login
        </LinkToModal>
        <ButtonWithIcon onClick={(e) => {
          handleSendLinkClick(e);
        }}
        >
          Enviar link
          <Arrow src="/icons/arrow_forward_right.svg" />
        </ButtonWithIcon>
      </Wrapper>
    </Form>
  );
}

export default FormSendResetRequest;
