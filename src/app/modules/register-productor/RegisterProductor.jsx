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
} from './registerProductor.controller';
import BasicInformationFieldset from '../../components/organisms/register-productor/BasicInformationFieldset';

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
    handleBlurChange={() => null}
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

const RegisterProductor = () => {
  const { state, dispatch } = useContext(Store);
  const [id, setId] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState({ url: '' });
  const [cnpj, setCNPJ] = useState('');
  const [cpf, setCPF] = useState('');
  const [musicalStyles, setMusicalStyles] = useState([]);
  const [musicalStylesOptions, setMusicalStylesOptions] = useState([]);
  const [musicalStylePredict, setMusicalStylePredict] = useState('');
  const [musicalStyle, setMusicalStyle] = useState('');
  const [name, setName] = useState('');
  const [productorStepErrors, setProductorStepErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step] = useState(0);

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
    musicalStyles, musicalStylePredict, musicalStyle, name,
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
      </FormWrapper>
      <StepFormFooter
        nextAction={() => {
          if (!id) {
            handleCreateProductor(
              values, state.user.id, setLoading, dispatch,
            );
          } else {
            handleEditProductor(
              values, id, state.user.id, setLoading, dispatch,
            );
          }
        }}
        loading={loading}
        skipAction={() => null}
      />
    </Form>
  );
};

export default withRouter(RegisterProductor);
