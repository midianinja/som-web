/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import Loading from '../../components/atoms/Loading.atom';
import StepFormHeader from '../../components/organisms/stepFormHeader.organism';
import StepFormFooter from '../../components/organisms/StepFormFooter.organism';
import { black, purple } from '../../settings/colors';
import {
  fetchMusicalStyleOptions, handleACMusicalStyle, handleMusicalStyleSelect,
  deleteTag, handleCreateProductor, mapMusicalStyles, handleEditProductor,
  nextCallback, fetchLocations, handleCountrySelect, handleStateSelect,
} from './registerProductor.controller';
import BasicInformationFieldset from '../../components/organisms/register-productor/BasicInformationFieldset';
import ContactFieldset from '../../components/organisms/register-productor/ContactField';
import LocationFieldset from '../../components/organisms/register-productor/LocationFieldset';
import SocialsFieldset from '../../components/organisms/register-productor/SocialsFieldset';

const Form = styled.form`
  width: 100%;
  background-color: ${black};
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 768px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const steps = [
  {
    title: 'Crie sua página de produtor',
    description: 'Salvamos seus dados após o continuar. Termine de completar suas informações mais tarde se quiser',
    small: false,
  },
];

const renderBasicInfos = ({
  values, setAbout, setName, productorStepErrors,
  musicalStylesOptions, musicalStyles, setMusicalStyle, setMusicalStylePredict,
  setMusicalStyles, setAvatar, setCPF, setCNPJ,
}) => (
  <BasicInformationFieldset
    deleteTag={id => deleteTag({
      id,
      tags: musicalStyles,
      setTag: setMusicalStyles,
    })}
    handleAboutChange={({ target }) => setAbout(target.value)}
    handleAvatarChange={({ target }) => setAvatar({
      url: URL.createObjectURL(target.files[0]),
      urls: null,
      file: target.files[0],
    })}
    handleCNPJChange={({ target }) => setCNPJ(target.value)}
    handleCPFChange={({ target }) => setCPF(target.value)}
    handleNameChange={({ target }) => setName(target.value)}
    handleMusicalStyleChange={({ target }) => handleACMusicalStyle({
      value: target.value,
      musicalStylesOptions,
      setMusicalStylePredict,
      setMusicalStyle,
    })}
    handleMusicalStyleSelect={value => handleMusicalStyleSelect({
      value,
      musicalStylesOptions,
      musicalStyles,
      setMusicalStyle,
      setMusicalStylePredict,
      setMusicalStyles,
    })}
    productorStepErrors={productorStepErrors}
    values={values}
  />
);

const renderLocationFieldset = ({
  values, visibles, setCity, setState, setCountry,
  productorStepErrors, setStates, countries, states,
}) => {
  if (!visibles.location) return null;
  return (
    <LocationFieldset
      values={values}
      coutry={values.country}
      state={values.state}
      countries={countries}
      states={states}
      productorStepErrors={productorStepErrors}
      handleCityChange={({ target }) => setCity(target.value)}
      handleCountrySelect={data => handleCountrySelect({ data, setStates, setCountry })}
      handleStateSelect={data => handleStateSelect({ data, setState })}
    />
  );
};

const renderContactFieldset = ({
  visibles, values, setMainPhone, setSecondaryPhone,
  setWhatsapp, setTelegram, setContactEmail, productorStepErrors,
}) => {
  if (!visibles.contact) return null;
  return (
    <ContactFieldset
      handleMainPhoneChange={({ target }) => setMainPhone(target.value)}
      handleSecondaryPhoneChange={({ target }) => setSecondaryPhone(target.value)}
      handleWhatsappChange={({ target }) => setWhatsapp(target.value)}
      handleTelegramChange={({ target }) => setTelegram(target.value)}
      handleContactEmailChange={({ target }) => setContactEmail(target.value)}
      productorStepErrors={productorStepErrors}
      values={values}
    />
  );
};

const renderSocialsFieldset = ({
  visibles, values, setFacebook, setTwitter,
  setYoutube, setInstagram, productorStepErrors,
}) => {
  if (!visibles.socials) return null;
  return (
    <SocialsFieldset
      handleFacebookChange={({ target }) => setFacebook(target.value)}
      handleInstagramChange={({ target }) => setInstagram(target.value)}
      handleTwitterChange={({ target }) => setTwitter(target.value)}
      handleYoutubeChange={({ target }) => setYoutube(target.value)}
      stepErrors={productorStepErrors}
      values={values}
    />
  );
};

const RegisterProductor = () => {
  const { state, dispatch } = useContext(Store);
  const [about, setAbout] = useState('');
  const [locationId, setLocationId] = useState('');
  const [avatar, setAvatar] = useState({ url: '' });
  const [city, setCity] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [cpf, setCPF] = useState('');
  const [facebook, setFacebook] = useState('https://www.facebook.com/');
  const [id, setId] = useState('');
  const [instagram, setInstagram] = useState('https://www.instagram.com/');
  const [loading, setLoading] = useState(false);
  const [mainPhone, setMainPhone] = useState('');
  const [musicalStyles, setMusicalStyles] = useState([]);
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicalStylePredict, setMusicalStylePredict] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [name, setName] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [productorStepErrors, setProductorStepErrors] = useState({});
  const [locationState, setState] = useState({});
  const [states, setStates] = useState([]);
  const [step] = useState(0);
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('https://twitter.com/');
  const [visibles, setVisibles] = useState({
    location: false,
    contact: false,
    socials: false,
  });
  const [whatsapp, setWhatsapp] = useState('');
  const [youtube, setYoutube] = useState('https://www.youtube.com/');

  const mapContextToState = (productor) => {
    setId(productor.id);
    setName(productor.name);
    setAbout(productor.description);
    setAvatar({ url: productor.photo });
    setCNPJ(productor.cnpj);
    setCPF(productor.cpf);
    setMusicalStyles(mapMusicalStyles(productor.musical_styles));
    setMainPhone(productor.main_phone || '');
    setSecondaryPhone(productor.secondary_phone || '');
    setWhatsapp(productor.whatsapp || '');
    setTelegram(productor.telegram || '');
    setContactEmail(productor.contact_email || '');
    setFacebook(productor.facebook || 'https://www.facebook.com/');
    setInstagram(productor.instagram || 'https://www.instagram.com/');
    setTwitter(productor.twitter || 'https://twitter.com/');
    setYoutube(productor.youtube || 'https://www.youtube.com/');

    if (productor.location && productor.location.id) {
      setLocationId(productor.location.id);
      setCity(productor.location.city);
    }
  };

  useEffect(() => {
    if (state.user && state.user.productor) {
      mapContextToState(state.user.productor);
    }

    fetchMusicalStyleOptions(setMusicalStylesOptions);
  }, []);

  useEffect(() => {
    if (state.user && state.user.productor) {
      const { productor } = state.user;
      mapContextToState(productor);
      fetchLocations({
        setCountries, setStates, setState, setCity,
        productor, setCountry,
      });
    }
  }, [state]);

  const values = {
    avatar, about, cpf, cnpj,
    instagram, musicalStyles, musicalStylePredict, musicalStyle,
    name, mainPhone, secondaryPhone, whatsapp, telegram,
    contactEmail, facebook, youtube, twitter, country, state: locationState,
    city, locationId,
  };

  if (!state.user) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <StepFormHeader color={purple} items={steps} index={step} />
      <FormWrapper>
        {
          renderBasicInfos({
            values, setAbout, setMusicalStyle, musicalStyles,
            setMusicalStylePredict, musicalStylesOptions, setMusicalStyles,
            setMusicalStylesOptions, setName, setAvatar, productorStepErrors,
            setProductorStepErrors, setCNPJ, setCPF,
          })
        }
        {
          renderLocationFieldset({
            visibles, values, setState, setCountry, setCity,
            countries, states, productorStepErrors, setStates,
            locationId, setLocationId,
          })
        }
        {
          renderContactFieldset({
            visibles, values, setMainPhone, setSecondaryPhone,
            setWhatsapp, setTelegram, setContactEmail, productorStepErrors,
          })
        }
        {
          renderSocialsFieldset({
            visibles, values, setFacebook, setInstagram,
            setTwitter, setYoutube, productorStepErrors,
          })
        }
      </FormWrapper>
      <StepFormFooter
        nextAction={() => {
          if (!id) {
            handleCreateProductor(
              values, state.user.id, setLoading, visibles,
              setVisibles, setLocationId, dispatch, state.user,
            );
          } else {
            handleEditProductor(
              values, id, state.user.id, setLoading,
              visibles, setVisibles, setLocationId, dispatch,
              state.user,
            );
          }
        }}
        loading={loading}
        skipAction={() => nextCallback({ visibles, setVisibles })}
      />
    </Form>
  );
};

export default withRouter(RegisterProductor);
