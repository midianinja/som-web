import React, { useState } from 'react';
import styled from 'styled-components';
import StepFormHeader from '../components/organisms/stepFormHeader.organism';
import BasicInformationFieldset from '../components/templates/register-artist/BasicInformationFieldset';
import ContactAndSongsFieldset from '../components/templates/register-artist/ContactAndSongsFieldset';
import FilesFieldset from '../components/templates/register-artist/FilesFieldSet';
import SocialsFieldset from '../components/templates/register-artist/SocialsFieldset';
import { black } from '../settings/colors';

const Form = styled.form`
  width: 100%;
  background-color: ${black};
  min-height: 100vh;
`;

const steps = [
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
  {
    title: 'Crie sua página de artista',
    description: 'Salvamos seus dados automaticamente. Se quiser, termine seu cadastro depois.',
  },
];

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
  const [step] = useState(0);

  return (
    <Form>
      <StepFormHeader items={steps} index={step} />
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
      <ContactAndSongsFieldset
        values={{
          songs: [
            'reuniao-demo-v2.wav',
            'tempo-barravento-demo-v2.wav',
            'cadilacolodum-supervao.mp3',
            'luaemgemeos-demo-v2.wav',
            'o-imperdivel-momento-da-semana-_-_supervao-adcionando-mais-texto-para-nao-encaixar.mp3',
          ],
        }}
      />
      <SocialsFieldset values={{}} />
      <FilesFieldset />
    </Form>
  );
}

export default RegisterArtist;
