import React from 'react';
import PropTypes from 'prop-types';
import VMasker from 'vanilla-masker';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import InputGroup from '../../molecules/InputGroup';
import TagList from '../../molecules/TagList';
import { white } from '../../../settings/colors';
import UploadAvatar from '../../atoms/UploadAvatar';
import AutocompleteInput from '../../molecules/InputAutocomplete';

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

function BasicInformationFieldset(props) {
  const {
    handleNameChange,
    handleAboutChange,
    handleCPFChange,
    deleteTag,
    handleAvatarChange,
    handleMusicalStyleChange,
    handleMusicalStyleSelect,
    productorStepErrors,
    values,
    descriptionMaxLength,
  } = props;

  return (
    <Fieldset>
      <Title>Informações do Produtor</Title>
      <MainInformationWrapper>
        <InputGroup
          error={productorStepErrors.avatar}
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
          <InputGroup label={values.name ? 'Nome completo' : ''} error={productorStepErrors.name}>
            <Input
              id="name"
              type="text"
              placeholder="Nome completo"
              value={values.name}
              onChange={handleNameChange}
            />
          </InputGroup>
          <InputGroup
            label={values.cpf ? 'CPF' : ''}
            error={productorStepErrors.cpf}
          >
            <Input
              id="cpf"
              placeholder="CPF"
              type="tel"
              value={VMasker.toPattern(values.cpf, '999.999.999-99')}
              onChange={handleCPFChange}
            />
          </InputGroup>
          <InputGroup
            label={values.musicalStyles.length ? 'Área de Atuação' : ''}
            error={productorStepErrors.musicalStyles}
          >
            <AutocompleteInput
              placeholder={values.musicalStyles.length ? '' : 'Área de Atuação'}
              predict={values.musicalStylePredict}
              value={values.musicalStyle}
              handleChange={handleMusicalStyleChange}
              handleSelect={handleMusicalStyleSelect}
            />
            <TagList
              handleClose={deleteTag}
              data={values.musicalStyles}
              customStyle={musicalGenresCustomStyle}
            />
          </InputGroup>
        </TextInpustWrapper>
      </MainInformationWrapper>
      <InputGroup label={values.about ? 'Sobre você' : ''} error={productorStepErrors.about}>
        <TextArea
          id="about"
          placeholder="Conte sobre você :)"
          value={values.about}
          onChange={handleAboutChange}
          maxLength={descriptionMaxLength}
        />
      </InputGroup>
    </Fieldset>
  );
}

const avatarShape = {
  uri: PropTypes.string,
};

const valuesShape = {
  about: PropTypes.string.isRequired,
  musicalGenres: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  cnpj: PropTypes.string.isRequired,
  avatar: PropTypes.shape(avatarShape).isRequired,
};

const errorsShape = {
  musicalGenres: PropTypes.string,
  name: PropTypes.string,
  about: PropTypes.string,
  cnpj: PropTypes.string,
  cpf: PropTypes.string,
};

BasicInformationFieldset.propTypes = {
  handleAboutChange: PropTypes.func.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  descriptionMaxLength: PropTypes.number.isRequired,
  handleMusicalStyleChange: PropTypes.func.isRequired,
  handleMusicalStyleSelect: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleCPFChange: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
  productorStepErrors: PropTypes.shape(errorsShape).isRequired,
};

export default BasicInformationFieldset;
