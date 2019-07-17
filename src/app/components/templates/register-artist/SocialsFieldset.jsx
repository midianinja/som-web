import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import InputGroup from '../../molecules/InputGroup';
import { white } from '../../../settings/colors';

const Fieldset = styled.fieldset`
  padding: 30px;
`;

const Title = styled.h2`
  color: ${white};
  font-size: 1.2857142857rem;
  font-weight: 400;
  margin-bottom: 30px;
`;

function SocialsFielset(props) {
  const { handleFacebookChange, handleTwitterChange, handleInstagramChange, handleYoutubeChange, values } = props;

  return (
    <Fieldset>
      <Title>Redes sociais</Title>
      <InputGroup info="O link deve conter https://">
        <Input
          id='facebook'
          placeholder='Facebook'
          value={values.facebook}
          type='url'
          onChange={handleFacebookChange}
        />
      </InputGroup>
      <InputGroup info="O link deve conter https://">
        <Input
          id='instagram'
          placeholder='Instagram'
          value={values.instagram}
          type='url'
          onChange={handleInstagramChange}
        />
      </InputGroup>
      <InputGroup info="O link deve conter https://">
        <Input
          id="twitter"
          placeholder="Twitter"
          value={values.twitter}
          type="url"
          onChange={handleTwitterChange}
        />
      </InputGroup>
      <InputGroup info="O link deve conter https://">
        <Input
          id="youtube"
          placeholder="Yuutube"
          value={values.youtube}
          type="url"
          onChange={handleYoutubeChange}
        />
      </InputGroup>
    </Fieldset>
  );
}

const valuesShape = {
  facebook: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  twiiter: PropTypes.string.isRequired,
  youtube: PropTypes.string.isRequired,
};

SocialsFielset.propTypes = {
  handleFacebookChange: PropTypes.func.isRequired,
  handleInstagramChange: PropTypes.func.isRequired,
  handleTwitterChange: PropTypes.func.isRequired,
  handleYoutubeChange: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default SocialsFielset;
