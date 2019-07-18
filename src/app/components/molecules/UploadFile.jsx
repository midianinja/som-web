import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import UploaderButton from '../atoms/uploaderButton';
import LinkButton from '../atoms/LinkButton';
import { white } from '../../settings/colors';

const ContentWrapper = styled.div`
  width: 100%;
  height: 110px;
  margin-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.div`
  width: 100%;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  color: ${white};
`;

const Subtitle = styled.div`
  width: 100%;
  heigth: 40px;
  font-size: 13px;
  line-height: 20px;
  margin-top: 5px;
  font-weight: 300;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  heigth: 30px;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Space = styled.div`
  width: 15px;
  heigth: 100%;
`;

const UploadFile = ({
  title, subtitle, type, handleFileChange, accept,
}) => (
  <ContentWrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    <ButtonsWrapper>
      <LinkButton> ver exemplo</LinkButton>
      <Space />
      <UploaderButton accept={accept} text={type} handleClick={handleFileChange} />
    </ButtonsWrapper>
  </ContentWrapper>
);

UploadFile.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.string,
  accept: PropTypes.string,
  handleFileChange: PropTypes.isRequired,
};

UploadFile.defaultProps = {
  title: 'Tipo de Arquivo',
  subtitle: 'Descrição',
  type: 'Arquivo',
  accept: '',
};

export default UploadFile;
