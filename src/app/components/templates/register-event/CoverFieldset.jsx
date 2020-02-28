import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputGroup from '../../molecules/InputGroup';
import UploadAvatar from '../../atoms/UploadAvatar';
import { white, gray } from '../../../settings/colors';
import { pink2blue } from '../../../settings/gradients';

const Fieldset = styled.fieldset`
  grid-area: cover;
  padding: 30px 15px;
  width: 100%;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.25em;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Span = styled.span`
  color: ${gray};
  font-size: 0.625rem;
`;

const avatarCustomStyle = `
  border-radius: 12px;
  background: ${pink2blue};
  width: 100%;
  max-width: 351px;
`;

function CoverFieldset({ values, onChange, eventErrors }) {
  return (
    <Fieldset>
      <Title>
        Foto de capa&nbsp;
        <Span>Tamanho sugerido: 1440x345px</Span>
      </Title>
      <InputGroup error={eventErrors.cover}>
        <UploadAvatar
          id="cover-uploader"
          alt="botão para subir imagem"
          title="Foto de capa do evento"
          handleChange={onChange}
          customStyle={avatarCustomStyle}
          src={values.cover.url && values.cover.url.url ? values.cover.url : values.cover}
        />
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  cover: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};

const errorsShape = {};
Object.keys(valuesShape).forEach((key) => {
  errorsShape[key] = '';
});


CoverFieldset.propTypes = {
  values: PropTypes.shape(valuesShape).isRequired,
  onChange: PropTypes.func.isRequired,
  eventErrors: PropTypes.shape(errorsShape).isRequired,
};


export default CoverFieldset;
