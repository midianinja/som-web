import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
// import UploaderButton from '../../atoms/uploaderButton';
import InputGroup from '../../molecules/InputGroup';
import { white/* , white30 */ } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
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

function ContactAndSongs(props) {
  const {
    handlePhoneChange,
    handleEmailChange,
    /* handleSongsURIChange, */
    contactStepErrors,
    values,
  } = props;

  return (
    <Fieldset>
      <Title>Contato</Title>
      <InputGroup error={contactStepErrors.phone}>
        <Input
          id="phone"
          placeholder="Telefone"
          value={values.phone}
          type="tel"
          onChange={handlePhoneChange}
        />
      </InputGroup>
      <InputGroup error={contactStepErrors.email}>
        <Input
          id="email"
          placeholder="E-mail"
          value={values.email}
          type="ëmail"
          onChange={handleEmailChange}
        />
      </InputGroup>
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
  songs: PropTypes.arrayOf(PropTypes.string),
  integrants: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

ContactAndSongs.propTypes = {
  handlePhoneChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  contactStepErrors: PropTypes.func.isRequired,
  // handleSongsURIChange: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default ContactAndSongs;
