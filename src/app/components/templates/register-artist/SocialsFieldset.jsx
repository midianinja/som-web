import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import InputGroup from '../../molecules/InputGroup';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
`;

function SocialsFielset(props) {
  const {
    handleFacebookChange,
    handleTwitterChange,
    handleInstagramChange,
    handleYoutubeChange,
    values,
    setStepErrors,
    stepErrors,
    handleBlurChange,
  } = props;
  console.log('stepErrors: ', stepErrors);

  return (
    <Fieldset>
      <Title>Redes sociais</Title>
      <InputGroup
        label={values.facebook ? 'Facebook url' : ''}
        info='O link deve conter https://'
        error={stepErrors.facebook}
      >
        <Input
          id='facebook'
          placeholder='Facebook'
          value={values.facebook}
          type='url'
          onChange={handleFacebookChange}
          onBlur={(e) => handleBlurChange(e, 'facebookUrl', setStepErrors, stepErrors)}
        />
      </InputGroup>
      <InputGroup
        label={values.instagram ? 'Instagram url' : ''}
        info='O link deve conter https://'
        error={stepErrors.instagram}
      >
        <Input
          id='instagram'
          placeholder='Instagram'
          value={values.instagram}
          type='url'
          onChange={handleInstagramChange}
          onBlur={(e) => handleBlurChange(e, 'instagramUrl', setStepErrors, stepErrors)}
        />
      </InputGroup>
      <InputGroup
        label={values.twitter ? 'Twitter url' : ''}
        info='O link deve conter https://'
        error={stepErrors.twitter}
      >
        <Input
          id='twitter'
          placeholder='Twitter'
          value={values.twitter}
          type='url'
          onChange={handleTwitterChange}
          onBlur={(e) => handleBlurChange(e, 'twitterUrl', setStepErrors, stepErrors)}
        />
      </InputGroup>
      <InputGroup
        label={values.youtube ? 'Youtube url' : ''}
        info='O link deve conter https://'
        error={stepErrors.youtube}
      >
        <Input
          id='youtube'
          placeholder='Youtube'
          value={values.youtube}
          type='url'
          onChange={handleYoutubeChange}
          onBlur={(e) => handleBlurChange(e, 'youtubeUrl', setStepErrors, stepErrors)}
        />
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  facebook: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  twiiter: PropTypes.string.isRequired,
  youtube: PropTypes.string.isRequired,
};

SocialsFielset.propTypes = {
  handleFacebookChange: PropTypes.func.isRequired,
  handleInstagramChange: PropTypes.func.isRequired,
  handleTwitterChange: PropTypes.func.isRequired,
  handleYoutubeChange: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func.isRequired,
  setStepErrors: PropTypes.func.isRequired,
  stepErrors: PropTypes.shape(valuesShape).isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default SocialsFielset;
