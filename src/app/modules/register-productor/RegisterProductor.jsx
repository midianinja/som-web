/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Store from '../../store/Store';
import StepFormHeader from '../../components/organisms/stepFormHeader.organism';
import StepFormFooter from '../../components/organisms/StepFormFooter.organism';
import { black, purple } from '../../settings/colors';
import {
  fetchMusicalStyleOptions, handleACMusicalStyle, handleMusicalStyleSelect,
  deleteTag, handleCreateProductor, mapMusicalStyles, handleEditProductor,
  nextCallback,
} from './registerProductor.controller';
import BasicInformationFieldset from '../../components/organisms/register-productor/BasicInformationFieldset';
import ContactFieldset from '../../components/organisms/register-productor/ContactField';
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

const steps = [
  {
    title: 'Crie sua página de productor',
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

const renderContactFieldset = ({
  visibles, values, setMainPhone, setSecondaryPhone,
  setWhatsapp, setTelegram, setContactEmail, productorStepErrors,
}) => {
  if (!visibles.contact) return null;
  return (
    <ContactFieldset
      handleMainPhone={({ target }) => setMainPhone(target.value)}
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
  const [avatar, setAvatar] = useState({ url: '' });
  const [cnpj, setCNPJ] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [facebook, setFacebook] = useState('');
  const [id, setId] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loading, setLoading] = useState(false);
  const [mainPhone, setMainPhone] = useState('');
  const [musicalStyles, setMusicalStyles] = useState([]);
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicalStylePredict, setMusicalStylePredict] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [name, setName] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [productorStepErrors, setProductorStepErrors] = useState({});
  const [step] = useState(0);
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [visibles, setVisibles] = useState({
    contact: false,
    socials: false,
  });
  const [whatsapp, setWhatsapp] = useState('');
  const [youtube, setYoutube] = useState('');

  const mapContextToState = (productor) => {
    setId(productor.id);
    setName(productor.name);
    setAbout(productor.description);
    setAvatar({ url: productor.photo });
    setCNPJ(productor.cnpj);
    setCPF(productor.cpf);
    setMusicalStyles(mapMusicalStyles(productor.musical_styles));
  };

  useEffect(() => {
    if (state.user && state.user.productor) {
      const { productor } = state.user;
      mapContextToState(productor);
    }

    fetchMusicalStyleOptions(setMusicalStylesOptions);
  }, []);

  useEffect(() => {
    if (state.user && state.user.productor) {
      const { productor } = state.user;
      mapContextToState(productor);
    }
  }, [state]);

  const values = {
    avatar, about, cpf, cnpj,
    instagram, musicalStyles, musicalStylePredict, musicalStyle,
    name, mainPhone, secondaryPhone, whatsapp, telegram,
    contactEmail, facebook, youtube, twitter,
  };

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
              setVisibles, dispatch,
            );
          } else {
            handleEditProductor(
              values, id, state.user.id, setLoading, visibles,
              setVisibles, dispatch,
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
