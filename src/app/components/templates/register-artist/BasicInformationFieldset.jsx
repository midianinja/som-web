import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '../../atoms/Select.atom';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import InputGroup from '../../molecules/InputGroup';
import TagList from '../../molecules/TagList';
import { white } from '../../../settings/colors';
import UploadAvatar from '../../atoms/UploadAvatar';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
`;

const musicalGenresCustomStyle = `
  margin-top: 10px;
`;

function BasicInformationFieldset(props) {
  const {
    handleNameChange, handleIntegrantsChange, handleCountrySelect,
    handleStateSelect, handleCityChange, handleAboutChange,
    values,
  } = props;

  return (
    <Fieldset>
      <Title>Informaçoões do artista</Title>
      <InputGroup>
        <UploadAvatar />
      </InputGroup>
      <InputGroup>
        <Input
          id="name"
          placeholder="Nome da banda"
          value={values.name}
          onChange={handleNameChange}
        />
      </InputGroup>
      <InputGroup>
        <Input
          id="integrants"
          placeholder="Integrantes"
          value={values.integrants}
          onChange={handleIntegrantsChange}
        />
      </InputGroup>
      <InputGroup label="Estilo de música">
        <Input
          id="musical_genres"
          placeholder=""
          value=""
          onChange={() => null}
        />
        <TagList
          data={values.musicalGenres}
          customStyle={musicalGenresCustomStyle}
        />
      </InputGroup>
      <InputGroup>
        <Select
          id="country"
          placeholder="País"
          value={values.country}
          onSelect={handleCountrySelect}
        />
      </InputGroup>
      <InputGroup>
        <Select
          id="state"
          placeholder="Estado"
          value={values.state}
          onSelect={handleStateSelect}
        />
      </InputGroup>
      <InputGroup>
        <Input
          id="city"
          placeholder="Cidade"
          value={values.city}
          onChange={handleCityChange}
        />
      </InputGroup>
      <InputGroup>
        <TextArea
          id="about"
          placeholder="Conte sobre sua banda :)"
          value={values.about}
          onChange={handleAboutChange}
        />
      </InputGroup>
    </Fieldset>
  );
}

const selectShape = {
  id: PropTypes.string,
  label: PropTypes.string,
};

const valuesShape = {
  city: PropTypes.string.isRequired,
  country: PropTypes.shape(selectShape),
  select: PropTypes.shape(selectShape),
  musicalGenres: PropTypes.arrayOf(PropTypes.string),
  integrants: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

BasicInformationFieldset.propTypes = {
  handleAboutChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleCountrySelect: PropTypes.func.isRequired,
  handleIntegrantsChange: PropTypes.func.isRequired,
  // handleMusicalGenresChange: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleStateSelect: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default BasicInformationFieldset;
