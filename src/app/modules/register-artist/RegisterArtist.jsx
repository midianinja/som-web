/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import StepFormHeader from '../../components/organisms/StepFormHeader.organism';
import BasicInformationFieldset from '../../components/templates/register-artist/BasicInformationFieldset';
import ContactAndSongsFieldset from '../../components/templates/register-artist/ContactAndSongsFieldset';
import FilesFieldset from '../../components/templates/register-artist/FilesFieldSet';
import SocialsFieldset from '../../components/templates/register-artist/SocialsFieldset';
import { black } from '../../settings/colors';
import StepFormFooter from '../../components/organisms/StepFormFooter.organism';
import {
  handleACMusicalStyle, steps, handleMusicalStyleSelect,
  fetchMusicalStyleOptions, nextAction, skipAction,
} from './registerArtist.controller';
import UploadSongs, { initialSong } from '../../components/templates/register-artist/UploadSongs';

const Form = styled.form`
  width: 100%;
  background-color: ${black};
  min-height: 100vh;
`;

const renderArtistInfos = ({
  values, setAvatar, setAbout, artistStepErrors,
  setCity, setIntegrants, setName,
  setCountry, setState, musicalStylesOptions,
  musicalStyles, setMusicalStyle, setMusicalStylePredict,
  setMusicalStyles,
}) => (
  <BasicInformationFieldset
    artistStepErrors={artistStepErrors}
    values={values}
    handleAvatarChange={({ target }) => setAvatar({
      url: URL.createObjectURL(target.files[0]),
      file: target.files[0],
    })}
    handleAboutChange={({ target }) => setAbout(target.value)}
    handleCityChange={({ target }) => setCity(target.value)}
    handleIntegrantsChange={({ target }) => setIntegrants(target.value)}
    handleNameChange={({ target }) => setName(target.value)}
    handleCountryChange={option => setCountry(option)}
    handleStateChange={option => setState(option)}
    handleMusicalStyleChange={({ target }) => handleACMusicalStyle({
      value: target.value, musicalStylesOptions, setMusicalStylePredict, setMusicalStyle,
    })}
    handleMusicalStyleSelect={value => handleMusicalStyleSelect({
      value, musicalStylesOptions, musicalStyles, setMusicalStyle,
      setMusicalStylePredict, setMusicalStyles,
    })}
  />
);

const renderContacts = ({
  setPhone, setEmail, phone,
  email, visibles, contactStepErrors,
}) => {
  if (!visibles.contact) return null;
  return (
    <ContactAndSongsFieldset
      contactStepErrors={contactStepErrors}
      handlePhoneChange={({ target }) => setPhone(target.value)}
      handleEmailChange={({ target }) => setEmail(target.value)}
      values={{
        phone,
        email,
        songs: [],
      }}
    />
  );
};

const renderSocialMedia = ({
  visibles, setFacebook, setInstagram,
  setTwitter, setYoutube, facebook,
  instagram, twitter, youtube,
}) => {
  if (!visibles.social) return null;
  return (
    <SocialsFieldset
      handleFacebookChange={({ target }) => setFacebook(target.value)}
      handleInstagramChange={({ target }) => setInstagram(target.value)}
      handleTwitterChange={({ target }) => setTwitter(target.value)}
      handleYoutubeChange={({ target }) => setYoutube(target.value)}
      values={{
        facebook,
        instagram,
        twitter,
        youtube,
      }}
    />
  );
};

const renderFiles = ({ visibles }) => {
  if (!visibles.files) return null;
  return (
    <FilesFieldset />
  );
};

const renderUploadFiles = () => {
  const [songs, setSongs] = useState([{ ...initialSong }]);
  return (
    <UploadSongs songs={songs} setSongs={setSongs} />
  );
};

function RegisterArtist() {
  const [artistStepErrors, setArtistStepErrors] = useState({});
  const [contactStepErrors, setContactStepErrors] = useState({});
  const [about, setAbout] = useState('');
  const [id, setId] = useState('');
  const [city, setCity] = useState('');
  const [integrants, setIntegrants] = useState('');
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState({});
  const [musicalStyles, setMusicalStyles] = useState([]);
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicalStylePredict, setMusicalStylePredict] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');
  const [visibles, setVisibles] = useState({
    artist: true,
    contact: false,
    social: false,
    files: false,
  });
  const [step] = useState(2);

  useEffect(() => {
    if (!musicalStylesOptions.length) {
      fetchMusicalStyleOptions(setMusicalStylesOptions);
    }
  }, [musicalStylesOptions]);
  const values = {
    avatar: avatar.url,
    name, integrants, about,
    country, state, city,
    musicalStyles, musicalStylePredict, musicalStyle,
  };

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <StepFormHeader items={steps} index={step} />
      {renderArtistInfos({
        values, setAvatar, setAbout, artistStepErrors,
        setCity, setIntegrants, setName,
        setCountry, setState, handleACMusicalStyle,
        handleMusicalStyleSelect, musicalStylesOptions, musicalStyles,
        setMusicalStyle, setMusicalStylePredict, setMusicalStyles,
      })}
      {renderContacts({
        setPhone, setEmail, phone,
        email, visibles, contactStepErrors,
      })}
      {renderUploadFiles()}
      {renderSocialMedia({
        visibles, setFacebook, setInstagram,
        setTwitter, setYoutube, facebook,
        instagram, twitter, youtube,
      })}
      {renderFiles({ visibles })}
      <StepFormFooter
        nextAction={() => nextAction({
          about, city, integrants, id, setId,
          country, state, name,
          avatar, musicalStyles, musicalStylesOptions,
          musicalStylePredict, musicalStyle, phone,
          email, facebook, instagram,
          twitter, youtube, visibles, setVisibles,
          setArtistStepErrors, setContactStepErrors,
        })}
        skipAction={() => skipAction('Skip')}
      />
    </Form>
  );
}

export default RegisterArtist;
