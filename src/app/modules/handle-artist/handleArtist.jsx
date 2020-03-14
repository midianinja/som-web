/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import StepFormHeader from '../../components/organisms/stepFormHeader.organism';
import BasicInformationFieldset from '../../components/templates/register-artist/BasicInformationFieldset';
import ContactAndSongsFieldset from '../../components/templates/register-artist/ContactAndSongsFieldset';
import SocialsFieldset from '../../components/templates/register-artist/SocialsFieldset';
import { black, white } from '../../settings/colors';
import StepFormFooter from '../../components/organisms/StepFormFooter.organism';
import {
  handleACMusicalStyle, steps, handleMusicalStyleSelect,
  fetchMusicalStyleOptions, nextAction, skipAction, handleBlurChange,
  fetchLocations, handleCountrySelect, handleStateSelect, deleteTag, mapArtistToState,
} from './handleArtist.controller';
import UploadSongs from '../../components/templates/register-artist/UploadSongs';

const Form = styled.form`
  padding-top: 52px;
  width: 100%;
  background-color: ${black};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 768px;
`;

const FilesBackGround = styled.div`
  background-color: ${white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const renderArtistInfos = ({
  state,
  values,
  deleteTagAction,
}) => (
  <BasicInformationFieldset
    artistStepErrors={state.artistStepErrors.value}
    setArtistStepErrors={state.artistStepErrors.update}
    values={values}
    deleteTag={deleteTagAction}
    countries={state.countries.value}
    states={state.states.value}
    memoryState={state}
    handleAvatarChange={({ target }) => state.avatar.update({
      url: { url: URL.createObjectURL(target.files[0]) },
      urls: null,
      file: target.files[0],
    })}
    country={state.country.value}
    state={state.state.value}
    handleCountrySelect={data => handleCountrySelect({ data, state })}
    handleStateSelect={data => handleStateSelect({ data, state })}
    handleAboutChange={({ target }) => state.about.update(target.value)}
    handleCityChange={({ target }) => state.city.update(target.value)}
    handleBlurChange={handleBlurChange}
    handleIntegrantsChange={({ target }) => state.integrants.update(target.value)}
    handleNameChange={({ target }) => state.name.update(target.value)}
    handleCountryChange={option => state.country.update(option)}
    handleStateChange={option => state.state.update(option)}
    handleMusicalStyleChange={({ target }) => handleACMusicalStyle({
      value: target.value,
      state,
    })}
    handleMusicalStyleSelect={value => handleMusicalStyleSelect({
      value,
      state,
    })}
  />
);

const renderContacts = ({ state }) => {
  if (!state.visibles.value.contact) return null;
  return (
    <ContactAndSongsFieldset
      setErrors={state.contactStepErrors.update}
      handleBlurChange={handleBlurChange}
      stepErrors={state.contactStepErrors.value}
      handlePhoneChange={({ target }) => state.phone.update(target.value)}
      handleEmailChange={({ target }) => state.email.update(target.value)}
      values={{
        phone: state.phone.value,
        email: state.email.value,
        songs: [],
      }}
    />
  );
};

const renderSocialMedia = ({ state }) => {
  if (!state.visibles.value.social) return null;
  return (
    <SocialsFieldset
      handleBlurChange={handleBlurChange}
      setStepErrors={state.socialMediaStepErrors.update}
      stepErrors={state.socialMediaStepErrors.value}
      handleFacebookChange={({ target }) => state.facebook.update(target.value)}
      handleInstagramChange={({ target }) => state.instagram.update(target.value)}
      handleTwitterChange={({ target }) => state.twitter.update(target.value)}
      handleYoutubeChange={({ target }) => state.youtube.update(target.value)}
      handleSpotifyChange={({ target }) => state.spotify.update(target.value)}
      values={{
        facebook: state.facebook.value,
        instagram: state.instagram.value,
        twitter: state.twitter.value,
        youtube: state.youtube.value,
        spotify: state.spotify.value,
      }}
    />
  );
};

const renderFiles = ({ state }) => {
  if (!state.visibles.value.files) return null;
  return null; // <FilesFieldset handleFileChange={uploadDocumentFile} artist={artist} />;
};

const getState = (store) => {
  const [artist, setArtist] = useState(store.state.user ? store.state.user.artist : {});
  const myArtist = store.state.user ? mapArtistToState(artist) : {};

  const [artistStepErrors, setArtistStepErrors] = useState({});
  const [contactStepErrors, setContactStepErrors] = useState({});
  const [socialMediaStepErrors, setSocialMediaStepErrors] = useState({});
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicalStylePredict, setMusicalStylePredict] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState(myArtist.about);
  const [phone, setPhone] = useState(myArtist.phone);
  const [city, setCity] = useState(myArtist.city);
  const [integrants, setIntegrants] = useState(myArtist.integrants);
  const [country, setCountry] = useState(myArtist.country || {});
  const [state, setState] = useState(myArtist.state || {});
  const [name, setName] = useState(myArtist.name);
  const [avatar, setAvatar] = useState(myArtist.avatar || {});
  const [musicalStyles, setMusicalStyles] = useState(myArtist.musicalStyles || []);
  const [email, setEmail] = useState(myArtist.email);
  const [facebook, setFacebook] = useState(myArtist.facebook || 'https://www.facebook.com/');
  const [instagram, setInstagram] = useState(myArtist.instagram || 'https://www.instagram.com/');
  const [twitter, setTwitter] = useState(myArtist.twitter || 'https://twitter.com/');
  const [spotify, setSpotify] = useState(myArtist.spotify);
  const [youtube, setYoutube] = useState(myArtist.youtube || 'https://www.youtube.com/');
  const [songs, setSongs] = useState([
    /* { ...initialSong } */
  ]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [visibles, setVisibles] = useState({
    artist: true,
    music: false,
    contact: false,
    social: false,
    files: false,
  });
  const [step, setStep] = useState(2);

  return ({
    artistStepErrors: { value: artistStepErrors, update: setArtistStepErrors },
    contactStepErrors: { value: contactStepErrors, update: setContactStepErrors },
    socialMediaStepErrors: { value: socialMediaStepErrors, update: setSocialMediaStepErrors },
    about: { value: about, update: setAbout },
    city: { value: city, update: setCity },
    integrants: { value: integrants, update: setIntegrants },
    country: { value: country, update: setCountry },
    state: { value: state, update: setState },
    name: { value: name, update: setName },
    avatar: { value: avatar, update: setAvatar },
    musicalStyles: { value: musicalStyles, update: setMusicalStyles },
    musicalStylesOptions: { value: musicalStylesOptions, update: setMusicalStylesOptions },
    musicalStylePredict: { value: musicalStylePredict, update: setMusicalStylePredict },
    musicalStyle: { value: musicalStyle, update: setMusicalStyle },
    phone: { value: phone, update: setPhone },
    email: { value: email, update: setEmail },
    loading: { value: loading, update: setLoading },
    facebook: { value: facebook, update: setFacebook },
    instagram: { value: instagram, update: setInstagram },
    twitter: { value: twitter, update: setTwitter },
    spotify: { value: spotify, update: setSpotify },
    youtube: { value: youtube, update: setYoutube },
    songs: { value: songs, update: setSongs },
    countries: { value: countries, update: setCountries },
    states: { value: states, update: setStates },
    visibles: { value: visibles, update: setVisibles },
    step: { value: step, update: setStep },
    artist: { value: artist, update: setArtist },
  });
};

const renderUploadSongs = ({ state }) => {
  if (!state.visibles.value.files || !state.artist.value) return null;
  return (
    <UploadSongs
      authId={state.artist.id}
      songs={state.songs.value}
      setSongs={state.songs.update}
    />
  );
};

const RegisterArtist = ({ history }) => {
  const store = useContext(Store);
  const state = getState(store);
  const oldArtist = (!!store.state.user && !!store.state.user.artist)
    ? mapArtistToState(store.state.user.artist, state) : {
      country: {},
      state: {},
      avatar: {},
      musicalStyles: [],
    };

  useEffect(() => {
    if (!state.musicalStylesOptions.value.length) {
      fetchMusicalStyleOptions(state.musicalStylesOptions.update);
    }
    if (state.artist.value && !state.artist.value.id && store.state.user) {
      if (oldArtist.avatar) state.avatar.update(oldArtist.avatar);
      if (oldArtist.name) state.name.update(oldArtist.name);
      if (oldArtist.integrants) state.integrants.update(oldArtist.integrants);
      if (oldArtist.about) state.about.update(oldArtist.about);
      if (oldArtist.city) state.city.update(oldArtist.city);
      if (oldArtist.country) state.country.update(oldArtist.country);
      if (oldArtist.state) state.state.update(oldArtist.state);
      if (oldArtist.musicalStyles) state.musicalStyles.update(oldArtist.musicalStyles);
      state.artist.update(store.state.user.artist);
      if (oldArtist.phone) state.phone.update(oldArtist.phone);
      if (oldArtist.email) state.email.update(oldArtist.email);
      if (oldArtist.instagram) state.instagram.update(oldArtist.instagram);
      if (oldArtist.twitter) state.twitter.update(oldArtist.twitter);
      if (oldArtist.spotify) state.spotify.update(oldArtist.spotify);
      if (oldArtist.youtube) state.youtube.update(oldArtist.youtube);
    }
    if (!state.countries.value.length) {
      fetchLocations({ state });
      fetchMusicalStyleOptions(state.musicalStylesOptions.update);
    }
  }, [state.musicalStylesOptions.value, state.countries.value, store.state.user]);

  const values = {
    avatar: state.avatar.value || oldArtist.avatar || {},
    name: state.name.value || oldArtist.name,
    integrants: state.integrants.value || oldArtist.integrants,
    about: state.about.value || oldArtist.about,
    city: state.city.value || oldArtist.city,
    musicalStylePredict: state.musicalStylePredict.value,
    musicalStyle: state.musicalStyle.value,
    country: state.country.value
      && state.country.value.value
      ? state.country.value : oldArtist.country,
    state: state.state.value
      && state.state.value.value
      ? state.state.value : oldArtist.state,
    musicalStyles: state.musicalStyles.value
      && state.musicalStyles.value.length
      ? state.musicalStyles.value : oldArtist.musicalStyles,
  };
  const deleteTagAction = id => deleteTag({
    id,
    musicalStyles: state.musicalStyles,
  });

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <StepFormHeader items={steps} index={state.step.value} />
      <FormWrapper>
        {renderArtistInfos({
          state, store,
          deleteTagAction,
          values,
        })}
        {renderContacts({ state })}
        {renderSocialMedia({ state })}
      </FormWrapper>
      <FilesBackGround>
        <FormWrapper>
          {renderUploadSongs({ store, state })}
          {renderFiles({ state })}
        </FormWrapper>
      </FilesBackGround>
      <StepFormFooter
        nextAction={() => nextAction({ store, state, history })}
        loading={state.loading.value}
        customStyle={state.visibles.value.files && state.artist.value.id ? `background-color: ${white};` : ''}
        skipAction={() => skipAction(state)}
      />
    </Form>
  );
};

export default withRouter(RegisterArtist);
