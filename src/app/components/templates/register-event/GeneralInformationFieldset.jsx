import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VMasker from 'vanilla-masker';
import InputGroup from '../../molecules/InputGroup';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  grid-area: general;
  padding: 30px 15px;
  width: 100%;
`;

const Row2Column = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  align-items: end;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

function GeneralInformationFieldset({
  values, handleTitleChange, handleEventDateChange, handleEndEventDateChange, 
  handleClosingSubscribeDateChange, handleDescriptionChange, handleOpeningsNumberChange,
  eventErrors, descriptionMaxLength,
}) {
  return (
    <Fieldset>
      <Title>
        Informações gerais
      </Title>
      <InputGroup label={values.title ? 'Título' : ''} error={eventErrors.title}>
        <Input
          id="title"
          type="text"
          placeholder="Título"
          value={values.title}
          onChange={handleTitleChange}
        />
      </InputGroup>
      <Row2Column>
        <InputGroup
          label={values.eventDate ? 'Data do evento' : ''}
          error={eventErrors.eventDate}
          info="Exemplo: 20/04/2020"
        >
          <Input
            id="eventDate"
            type="tel"
            placeholder="Data do evento"
            value={VMasker.toPattern(values.eventDate, '99/99/9999')}
            onChange={handleEventDateChange}
          />
        </InputGroup>
        <InputGroup
          label={values.endEventDate ? 'Término' : ''}
          error={eventErrors.endEventDate}
          info="Exemplo: 20/04/2020"
        >
          <Input
            id="endEventDate"
            type="tel"
            placeholder="Término"
            value={VMasker.toPattern(values.endEventDate, '99/99/9999')}
            onChange={handleEndEventDateChange}
          />
        </InputGroup>
      </Row2Column>
      <InputGroup
        label={values.closingSubscribeDate ? 'Data do fim das inscrições' : ''}
        error={eventErrors.closingSubscribeDate}
        info="Exemplo: 20/04/2020"
      >
        <Input
          id="closingSubscribeDate"
          type="tel"
          placeholder="Data do final das inscrições"
          value={VMasker.toPattern(values.closingSubscribeDate, '99/99/9999')}
          onChange={handleClosingSubscribeDateChange}
        />
      </InputGroup>
      <InputGroup
        label={values.openingsNumber ? 'Quantidade de vagas no evento' : ''}
        error={eventErrors.openingsNumber}
      >
        <Input
          id="openingsNumber"
          type="tel"
          placeholder="Quantidade de vagas no evento"
          value={VMasker.toPattern(values.openingsNumber, '999')}
          onChange={handleOpeningsNumberChange}
        />
      </InputGroup>
      <InputGroup
        label={values.description ? 'Descrição do evento' : ''}
        error={eventErrors.description}
      >
        <TextArea
          id="description"
          placeholder="Descrição do evento"
          value={values.description}
          onChange={handleDescriptionChange}
          maxLength={descriptionMaxLength}
        />
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  title: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  closingSubscribeDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  openingsNumber: PropTypes.string.isRequired,
  descriptionMaxLength: PropTypes.number.isRequired,
};

const errorsShape = {};
Object.keys(valuesShape).forEach((key) => {
  errorsShape[key] = '';
});

GeneralInformationFieldset.propTypes = {
  values: PropTypes.shape(valuesShape).isRequired,
  eventErrors: PropTypes.shape(errorsShape).isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleEventDateChange: PropTypes.func.isRequired,
  handleEndEventDateChange: PropTypes.func.isRequired,
  handleClosingSubscribeDateChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleOpeningsNumberChange: PropTypes.func.isRequired,
  descriptionMaxLength: PropTypes.number.isRequired,
};

export default GeneralInformationFieldset;
