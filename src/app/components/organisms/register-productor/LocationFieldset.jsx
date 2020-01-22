import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import InputGroup from '../../molecules/InputGroup';
import ListInput from '../../molecules/ListInput.molecule';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px 15px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

const inputGroup30Style = `
  @media (min-width: 1024px) {
    width: calc(30% - 10px);

    & + & {
      margin-left: 15px;
    }
  }
`;

const LocationWrapper = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

function LocationFieldset(props) {
  const {
    country,
    countries,
    state,
    states,
    productorStepErrors,
    handleCountrySelect,
    handleStateSelect,
    handleCityChange,
    values,
  } = props;

  return (
    <Fieldset>
      <Title>Residência</Title>
      <LocationWrapper>
        <InputGroup
          customStyle={inputGroup30Style}
          label={country.id ? 'País' : ''}
          error={productorStepErrors.country}
        >
          <ListInput
            id="country"
            placeholder="País"
            options={countries}
            selected={values.country}
            value={country}
            onSelect={handleCountrySelect}
          />
        </InputGroup>
        <InputGroup
          customStyle={inputGroup30Style}
          label={state.id ? 'Estado' : ''}
          error={productorStepErrors.state}
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
          customStyle={inputGroup30Style}
          label={values.city ? 'Cidade' : ''}
          error={productorStepErrors.city}
        >
          <Input
            id="city"
            placeholder="Cidade"
            value={values.city}
            onChange={handleCityChange}
          />
        </InputGroup>
      </LocationWrapper>
    </Fieldset>
  );
}


const valuesShape = {
  about: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  cnpj: PropTypes.string.isRequired,
};

const errorsShape = {
  musicalGenres: PropTypes.string,
  name: PropTypes.string,
  about: PropTypes.string,
  cnpj: PropTypes.string,
  cpf: PropTypes.string,
};

const optionShape = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

LocationFieldset.propTypes = {
  handleCountrySelect: PropTypes.func.isRequired,
  handleStateSelect: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape(optionShape)),
  country: PropTypes.shape(optionShape),
  states: PropTypes.arrayOf(PropTypes.shape(optionShape)),
  state: PropTypes.shape(optionShape),
  values: PropTypes.shape(valuesShape).isRequired,
  productorStepErrors: PropTypes.shape(errorsShape).isRequired,
};

LocationFieldset.defaultProps = {
  country: {},
  state: {},
  countries: [],
  states: [],
};

export default LocationFieldset;
