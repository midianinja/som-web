import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
// import UploaderButton from '../../atoms/uploaderButton';
import InputGroup from '../../molecules/InputGroup';
import { white /* , white30 */ } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
  width: 100%;
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
  @media (min-width: 1024px) {
    width: 45%;
  }
`;

// const UploadSongsWrapper = styled.div`
//   width: 100%;
// `;

// const UploadSongs = styled.div`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   justify-content: space-between;
// `;

// const UploadSongsLabel = styled.label`
//   color: ${white};
//   font-size: 0.85714285716em;
//   font-weight: 300;
// `;

// const SongText = styled.p`
//   width: 100%;
//   color ${white30};
//   font-size: 0.85714285716em;
//   margin-top: 15px;
//   text-align: right;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// function renderSongs(songs = []) {
//   return songs.map(song => <SongText>{song}</SongText>);
// }

const ContactAndSongs = ({
  handlePhoneChange, handleEmailChange, handleBlurChange,
  setErrors, stepErrors, values,
}) => (
  <Fieldset>
    <Title>Contato</Title>
    <InputsWrapper>
      <InputGroup customStyle={inputGroupStyle} label={values.phone ? 'Telefone' : ''} error={stepErrors.phone}>
        <Input
          id="phone"
          placeholder="Telefone"
          value={values.phone}
          type="tel"
          onChange={handlePhoneChange}
          onBlur={e => handleBlurChange(e, 'phone', setErrors, stepErrors)}
        />
      </InputGroup>
      <InputGroup customStyle={inputGroupStyle} label={values.email ? 'E-mail' : ''} error={stepErrors.email}>
        <Input
          id="email"
          placeholder="E-mail"
          value={values.email}
          type="email"
          onChange={handleEmailChange}
          onBlur={e => handleBlurChange(e, 'email', setErrors, stepErrors)}
        />
      </InputGroup>
    </InputsWrapper>
    {/* <InputGroup label="Sua música" info="Link do Spotify, Deezer, Soundcloud ou similar">
      <Input
        id="songsURI"
        value={values.songsURI}
        onChange={handleSongsURIChange}
      />
    </InputGroup>
    <UploadSongsWrapper>
      <UploadSongs>
        <UploadSongsLabel>
          ou suba seus arquivos
        </UploadSongsLabel>
        <UploaderButton text="músicas" />
      </UploadSongs>
    </UploadSongsWrapper> */}
  </Fieldset>
);

const selectShape = {
  id: PropTypes.string,
  label: PropTypes.string,
};

const valuesShape = {
  city: PropTypes.string.isRequired,
  country: PropTypes.shape(selectShape),
  select: PropTypes.shape(selectShape),
  musicalGenres: PropTypes.arrayOf(PropTypes.string),
  songs: PropTypes.arrayOf(PropTypes.string),
  integrants: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

const errorsShape = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

ContactAndSongs.propTypes = {
  handlePhoneChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  stepErrors: PropTypes.shape(errorsShape).isRequired,
  // handleSongsURIChange: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default ContactAndSongs;
