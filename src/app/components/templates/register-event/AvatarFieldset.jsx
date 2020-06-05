import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputGroup from '../../molecules/InputGroup';
import UploadAvatar from '../../atoms/UploadAvatar';
import { white, gray } from '../../../settings/colors';
import { green2yellow } from '../../../settings/gradients';

const Fieldset = styled.fieldset`
  grid-area: avatar;
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
  background: ${green2yellow};
`;

function AvatarFieldset({ values, onChange, eventErrors }) {
  return (
    <Fieldset>
      <Title>
        Avatar&nbsp;
        <Span>Tamanho sugerido: 500x500px</Span>
      </Title>
      <InputGroup error={eventErrors.avatar}>
        <UploadAvatar
          id="avatar-uploader"
          alt="botão para subir imagem"
          title="avatar image"
          handleChange={onChange}
          customStyle={avatarCustomStyle}
          src={values.avatar.url && values.avatar.url.url ? values.avatar.url : values.avatar}
        />
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  avatar: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
};

const errorsShape = {};
Object.keys(valuesShape).forEach((key) => {
  errorsShape[key] = '';
});

AvatarFieldset.propTypes = {
  values: PropTypes.shape(valuesShape).isRequired,
  onChange: PropTypes.func.isRequired,
  eventErrors: PropTypes.shape(errorsShape).isRequired,
};

export default AvatarFieldset;
