import React, { useState } from 'react';
import styled from 'styled-components';
import BasicInformationFieldset from '../components/templates/register-artist/BasicInformationFieldset';
import FilesFieldset from '../components/templates/register-artist/FilesFieldSet';
import { black } from '../settings/colors';

const Form = styled.form`
  background-color: ${black};
  min-height: 100vh;
`;

function RegisterArtist() {
  const [about, setAbout] = useState('');
  const [city, setCity] = useState('');
  const [integrants, setIntegrants] = useState('');
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [name, setName] = useState('');
  const [musicalGenres, setMusicalGenres] = useState([
    { text: 'Rock', id: 'rock', color: 'yellow' },
    { text: 'Samba', id: 'samba', color: 'green' },
    { text: 'Jazz', id: 'jaxx', color: 'purple' },
  ]);

  return (
    <Form>
      <BasicInformationFieldset
        values={{
          name,
          integrants,
          about,
          country,
          state,
          city,
          musicalGenres,
        }}
        handleAboutChange={({ target }) => setAbout(target.value)}
        handleCityChange={({ target }) => setCity(target.value)}
        handleIntegrantsChange={({ target }) => setIntegrants(target.value)}
        handleNameChange={({ target }) => setName(target.value)}
        handleCountryChange={option => setCountry(option)}
        handleStateChange={option => setState(option)}
        handleMusicalGenresChange={data => setMusicalGenres(data)}
      />
      <FilesFieldset />
    </Form>
  );
}

export default RegisterArtist;