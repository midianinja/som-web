import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from '../../atoms/Checkbox.atom';
import InputGroup from '../../molecules/InputGroup';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  grid-area: conditions;
  padding: 30px 15px;
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

const renderConditions = ({
  values, handleAccomodationChange, handleHasFoodChange,
  handleMoneyPaidChange, handleCityTransportationChange,
  handleLocalTransportationChange, handleInterstateTransportationChange,
  handleInternationalTransportationChange,
}) => [
  {
    text: 'Acomodação',
    handle: handleHasFoodChange,
    checked: values.hasFood,
  },
  {
    text: 'Alimentação',
    handle: handleAccomodationChange,
    checked: values.hasAccomodation,
  },
  {
    text: 'Cachê',
    handle: handleMoneyPaidChange,
    checked: values.hasMoneyPaid,
  },
  {
    text: 'Translado local',
    handle: handleLocalTransportationChange,
    checked: values.hasLocalTransportation,
  },
  {
    text: 'Translado intermunicipal',
    handle: handleCityTransportationChange,
    checked: values.hasCityTransportation,
  },
  {
    text: 'Translado interestadual',
    handle: handleInterstateTransportationChange,
    checked: values.hasInterstateTransportation,
  },
  {
    text: 'Translado internacional',
    handle: handleInternationalTransportationChange,
    checked: values.hasInternationalTransportation,
  },
].map(({ text, checked, handle }) => (
  <CheckboxWrapper>
    <Checkbox checked={checked} text={text} onChange={handle} />
  </CheckboxWrapper>
));

function ConditionsFieldset({
  values, handleAccomodationChange, handleHasFoodChange,
  handleMoneyPaidChange, handleCityTransportationChange,
  handleLocalTransportationChange, handleInterstateTransportationChange,
  handleInternationalTransportationChange,
}) {
  return (
    <Fieldset>
      <Title>
        Condições oferecidas
      </Title>
      <InputGroup label="" error="">
        {
          renderConditions({
            values, handleAccomodationChange, handleHasFoodChange,
            handleMoneyPaidChange, handleCityTransportationChange,
            handleLocalTransportationChange, handleInterstateTransportationChange,
            handleInternationalTransportationChange,
          })
        }
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  title: PropTypes.string.isRequired,
  hasFood: PropTypes.bool.isRequired,
  hasAccomodation: PropTypes.bool.isRequired,
  hasMoneyPaid: PropTypes.bool.isRequired,
  hasLocalTransportation: PropTypes.bool.isRequired,
  hasCityTransportation: PropTypes.bool.isRequired,
  hasInterstateTrasnportation: PropTypes.bool.isRequired,
  hasInternationalTransportation: PropTypes.bool.isRequired,
};

const errorsShape = {};
Object.keys(valuesShape).forEach((key) => {
  errorsShape[key] = '';
});

ConditionsFieldset.propTypes = {
  values: PropTypes.shape(valuesShape).isRequired,
  handleAccomodationChange: PropTypes.func.isRequired,
  handleHasFoodChange: PropTypes.func.isRequired,
  handleMoneyPaidChange: PropTypes.func.isRequired,
  handleCityTransportationChange: PropTypes.func.isRequired,
  handleLocalTransportationChange: PropTypes.func.isRequired,
  handleInterstateTransportationChange: PropTypes.func.isRequired,
  handleInternationalTransportationChange: PropTypes.func.isRequired,
};

export default ConditionsFieldset;
