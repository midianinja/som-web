import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import InputGroup from '../../molecules/InputGroup';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const InputsWrapper = styled.div`
@media (min-width: 1024px) {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
`;


const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
`;

const inputGroupStyle = `
  @media (min-width: 768px) {
    display: inline-block;
    width: calc(50% - 7px);
    
    & + & {
      margin-left: 14px;
    }
  }
`;

function SocialsFielset(props) {
  const {
    handleFacebookChange,
    handleTwitterChange,
    handleInstagramChange,
    handleYoutubeChange,
    values,
    stepErrors,
  } = props;

  return (
    <Fieldset>
      <Title>Redes sociais</Title>
      <InputsWrapper>
        <InputGroup
          customStyle={inputGroupStyle}
          label={values.facebook ? 'Facebook url' : ''}
          info="O link deve conter https://"
          error={stepErrors.facebook}
        >
          <Input
            id="facebook"
            placeholder="Facebook"
            value={values.facebook}
            type="url"
            onChange={handleFacebookChange}
          />
        </InputGroup>
        <InputGroup
          customStyle={inputGroupStyle}
          label={values.instagram ? 'Instagram url' : ''}
          info="O link deve conter https://"
          error={stepErrors.instagram}
        >
          <Input
            id="instagram"
            placeholder="Instagram"
            value={values.instagram}
            type="url"
            onChange={handleInstagramChange}
          />
        </InputGroup>
      </InputsWrapper>
      <InputsWrapper>
        <InputGroup
          customStyle={inputGroupStyle}
          label={values.twitter ? 'Twitter url' : ''}
          info="O link deve conter https://"
          error={stepErrors.twitter}
        >
          <Input
            id="twitter"
            placeholder="Twitter"
            value={values.twitter}
            type="url"
            onChange={handleTwitterChange}
          />
        </InputGroup>
        <InputGroup
          customStyle={inputGroupStyle}
          label={values.youtube ? 'Youtube url' : ''}
          info="O link deve conter https://"
          error={stepErrors.youtube}
        >
          <Input
            id="youtube"
            placeholder="Youtube"
            value={values.youtube}
            type="url"
            onChange={handleYoutubeChange}
          />
        </InputGroup>
      </InputsWrapper>
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
  stepErrors: PropTypes.shape(valuesShape).isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default SocialsFielset;
