import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import InputGroup from '../../molecules/InputGroup';
import TagList from '../../molecules/TagList';
import { white } from '../../../settings/colors';
import UploadAvatar from '../../atoms/UploadAvatar';
import ListInput from '../../molecules/ListInput.molecule';

const Fieldset = styled.fieldset`
  padding: 30px 15px;
  width: 100%;
`;

const MainInformationWrapper = styled.div`
width: 100%;
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const LocationWrapper = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const TextInpustWrapper = styled.div`
  @media (min-width: 1024px) {
    margin-left: 20px;
    width: 100%;
  }
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

const musicalGenresCustomStyle = `
  margin-top: 10px;
`;

const avatarInputGroupStyle = `
  text-align: center;

  @media (min-width: 1024px) {
    margim-bottom: 0;
    width: 200px
  }
`;

const inputGroupStyle = `
  @media (min-width: 1024px) {
    margim-bottom: 0;
    width: 200px
  }
`;

function BasicInformationFieldset(props) {
  const {
    countries,
    handleNameChange,
    handleIntegrantsChange,
    handleCountrySelect,
    handleStateSelect,
    handleCityChange,
    country,
    state,
    states,
    handleAboutChange,
    deleteTag,
    memoryState,
    handleAvatarChange,
    handleMusicalStyleSelect,
    handleBlurChange,
    setArtistStepErrors,
    artistStepErrors,
    values,
  } = props;

  return (
    <Fieldset>
      <Title>Informações do artista</Title>
      <MainInformationWrapper>
        <InputGroup
          error={artistStepErrors.avatar}
          customStyle={avatarInputGroupStyle}
        >
          <UploadAvatar
            alt="botão para subir imagem"
            title="avatar image"
            handleChange={handleAvatarChange}
            src={values.avatar.url && values.avatar.url.url ? values.avatar.url : values.avatar}
          />
        </InputGroup>
        <TextInpustWrapper>
          <InputGroup label={values.name ? 'Nome da banda/artista' : ''} error={artistStepErrors.name}>
            <Input
              id="name"
              placeholder="Nome da banda/artista"
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
          <InputGroup label={values.musicalStyles.length ? 'Estilo de música' : ''} error={artistStepErrors.musicalStyles}>
            <ListInput
              id="musical_style"
              placeholder="Estilo de música"
              options={memoryState.musicalStylesOptions.value.map(op => ({
                label: op.name,
                id: op.id,
              }))}
              onSelect={data => handleMusicalStyleSelect({ value: data, state: memoryState })}
            />
            <TagList
              handleClose={deleteTag}
              data={values.musicalStyles}
              customStyle={musicalGenresCustomStyle}
            />
          </InputGroup>
        </TextInpustWrapper>
      </MainInformationWrapper>
      <LocationWrapper>
        <InputGroup
          customStyle={inputGroupStyle}
          label={country.id ? 'País' : ''}
          error={artistStepErrors.country}
        >
          <ListInput
            id="country"
            placeholder="País"
            options={countries}
            selected={country}
            value={values.country}
            onSelect={handleCountrySelect}
          />
        </InputGroup>
        <InputGroup
          customStyle={inputGroupStyle}
          label={state.id ? 'Estado' : ''}
          error={artistStepErrors.state}
        >
          <ListInput
            id="state"
            placeholder="Estado"
            value={values.state}
            selected={state}
            options={states}
            onSelect={handleStateSelect}
          />
        </InputGroup>
        <InputGroup
          customStyle={inputGroupStyle}
          label={values.city ? 'Cidade' : ''}
          error={artistStepErrors.city}
        >
          <Input
            id="city"
            placeholder="Cidade"
            onBlur={e => handleBlurChange(e, 'common', setArtistStepErrors, artistStepErrors)}
            value={values.city}
            onChange={handleCityChange}
          />
        </InputGroup>
      </LocationWrapper>
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

BasicInformationFieldset.defaultProps = {
  country: {},
  state: {},
  memoryState: {
    musicalStylesOptions: [],
  },
};

BasicInformationFieldset.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  memoryState: PropTypes.shape({
    musicalStylesOptions: PropTypes.arrayOf(PropTypes.object),
  }),
  state: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAboutChange: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleCountrySelect: PropTypes.func.isRequired,
  handleIntegrantsChange: PropTypes.func.isRequired,
  handleMusicalStyleSelect: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleStateSelect: PropTypes.func.isRequired,
  setArtistStepErrors: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func,
  values: PropTypes.shape(valuesShape).isRequired,
  artistStepErrors: PropTypes.shape(errorsShape).isRequired,
};

export default BasicInformationFieldset;
