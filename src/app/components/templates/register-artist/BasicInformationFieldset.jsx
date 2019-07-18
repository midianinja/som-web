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
import AutocompleteInput from '../../molecules/InputAutocomplete';

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
    handleNameChange,
    handleIntegrantsChange,
    handleCountrySelect,
    handleStateSelect,
    handleCityChange,
    handleAboutChange,
    handleAvatarChange,
    handleMusicalStyleChange,
    handleMusicalStyleSelect,
    handleBlurChange,
    setArtistStepErrors,
    artistStepErrors,
    values,
  } = props;

  return (
    <Fieldset>
      <Title>Informaçoões do artista</Title>
      <InputGroup
        error={artistStepErrors.avatar}
        customStyle="display: flex; justify-content: center; align-items: center;"
      >
        <UploadAvatar
          alt="botão para subir imagem"
          title="avatar image"
          handleChange={handleAvatarChange}
          src={values.avatar || ''}
        />
      </InputGroup>
      <InputGroup label={values.name ? 'Nome da banda' : ''} error={artistStepErrors.name}>
        <Input
          id="name"
          placeholder="Nome da banda"
          value={values.name}
          onBlur={e => handleBlurChange(e, 'common', setArtistStepErrors, artistStepErrors)}
          onChange={handleNameChange}
        />
      </InputGroup>
      <InputGroup label={values.integrants ? 'Numero de Integrantes' : ''} error={artistStepErrors.integrants}>
        <Input
          id="integrants"
          type="tel"
          placeholder="Integrantes"
          onBlur={e => handleBlurChange(e, 'number', setArtistStepErrors, artistStepErrors)}
          value={values.integrants}
          onChange={handleIntegrantsChange}
        />
      </InputGroup>
      <InputGroup label="Estilo de música" error={artistStepErrors.musicalStyles}>
        <AutocompleteInput
          predict={values.musicalStylePredict}
          value={values.musicalStyle}
          handleChange={handleMusicalStyleChange}
          handleSelect={handleMusicalStyleSelect}
        />
        <TagList data={values.musicalStyles} customStyle={musicalGenresCustomStyle} />
      </InputGroup>
      <InputGroup label={values.country ? 'País' : ''} error={artistStepErrors.country}>
        <Select id="country" placeholder="País" value={values.country} onSelect={handleCountrySelect} />
      </InputGroup>
      <InputGroup label={values.state ? 'Estado' : ''} error={artistStepErrors.state}>
        <Select id="state" placeholder="Estado" value={values.state} onSelect={handleStateSelect} />
      </InputGroup>
      <InputGroup label={values.city ? 'Cidade' : ''} error={artistStepErrors.city}>
        <Input
          id="city"
          placeholder="Cidade"
          onBlur={e => handleBlurChange(e, 'common', setArtistStepErrors, artistStepErrors)}
          value={values.city}
          onChange={handleCityChange}
        />
      </InputGroup>
      <InputGroup label={values.about ? 'Sobre sua banda' : ''} error={artistStepErrors.about}>
        <TextArea
          id="about"
          placeholder="Conte sobre sua banda :)"
          onBlur={e => handleBlurChange(e, 'description', setArtistStepErrors, artistStepErrors)}
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

const errorsShape = {
  city: PropTypes.string,
  country: PropTypes.string,
  select: PropTypes.string,
  musicalGenres: PropTypes.string,
  integrants: PropTypes.string,
  name: PropTypes.string,
  about: PropTypes.string,
};

BasicInformationFieldset.defaultProps = {
  handleBlurChange: () => '',
};

BasicInformationFieldset.propTypes = {
  handleAboutChange: PropTypes.func.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleCountrySelect: PropTypes.func.isRequired,
  handleIntegrantsChange: PropTypes.func.isRequired,
  handleMusicalStyleChange: PropTypes.func.isRequired,
  handleMusicalStyleSelect: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleStateSelect: PropTypes.func.isRequired,
  setArtistStepErrors: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func,
  values: PropTypes.shape(valuesShape).isRequired,
  artistStepErrors: PropTypes.shape(errorsShape).isRequired,
};

export default BasicInformationFieldset;
