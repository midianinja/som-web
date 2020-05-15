import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar.atom';
import Socials from '../../organisms/Socials';
import TagList from '../../molecules/TagList';
import PrimaryButton from '../../atoms/PrimaryButton';
import {
  green,
} from '../../../settings/colors';

const Wrapper = styled.section`
  display: inline-block;
  width: 100%;
  max-width: 420px;
  padding-bottom: 40px;

  @media (min-width: 1024px) {
    position: sticky;
    top: 150px;
    align-self: flex-start;
    text-align: left;
  }
`;

const ProductorReference = styled.span`
  margin-bottom: 15px;
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-weight: 200;
  font-size: 10px;
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (min-width: 1024px) {
    padding-left: 10px;
    padding-right: 0px;
    margin-top: 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  font-size: 2.1428571429em;
  font-weight: 400;
  line-height: 1.1em;

  @media (min-width: 1024px) {
    padding-left: 10px;
    padding-right: 0px;
    margin-top: 0;
    max-width: 200px;
  }
`;

const TitleAndFollowWrapper = styled.div`
  @media (min-width: 1024px) {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }
`;
const avatarCustomStyled = `
  width: 140px;
  height: 140px;
  vertical-align: middle;
`;

const About = styled.p`
  margin-bottom: 45px;
  margin-top: 45px;
  line-height: 2em;
  font-weight: 300;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
  font-size: 0.8571428571em;
  transition-duration: 0.2s;

  @media (min-width: 1024px) {
    padding-left: 0px;
    padding-right: 10px;
  }
`;

const LocationWrapper = styled.div`
  margin-top: 10px;
`;

const LocationText = styled.h4`
  font-size: 0.875rem;
  font-weight: 400;

  @media (min-width: 1024px) {
    padding-left: 10px;
  }
`;

const LocationCountryText = styled.h4`
  font-size: 0.75rem;
  font-weight: 200;
  margin-top: 2px;

  @media (min-width: 1024px) {
    padding-left: 10px;
  }
`;

const LerMoreBio = styled.span`
  color: ${green};
  cursor: pointer;
`;

function ProductorBasicInfo(props) {
  const {
    name, avatar, musicalStyles, address,
    about, facebook, instagram, twitter,
    email, isMyProductor, history,
  } = props;

  const [lerMoreBio, setLerMoreBio] = useState(false);
  const colors = [
    'purple', 'green', 'orange',
    'magenta', 'yellow',
  ];
  return (
    <Wrapper id="infos">
      <Avatar customStyle={avatarCustomStyled} src={avatar} alt={name} />
      <TitleAndFollowWrapper>
        <ProductorReference>Produtor</ProductorReference>
        <Title>{name}</Title>
        {
          address ? (
            <LocationWrapper>
              <LocationText>
                {`${address.city}, ${address.state}`}
              </LocationText>
              <LocationCountryText>
                {address.country}
              </LocationCountryText>
            </LocationWrapper>
          ) : null
        }
      </TitleAndFollowWrapper>
      <About>
        {!lerMoreBio ? about.slice(0, 200) : about}
        {!lerMoreBio && about.length > 200 ? '...' : ''}
        &nbsp;
        {
          about.length > 200
            ? (
              <LerMoreBio
                onClick={() => setLerMoreBio(!lerMoreBio)}
              >
                {!lerMoreBio ? 'Ler mais' : 'Ler menos'}
              </LerMoreBio>
            ) : null
        }
      </About>
      <TagList
        data={musicalStyles.map(({ id, name: n }) => ({
          id,
          text: n,
          color: colors[Math.floor(Math.random() * colors.length)],
        }))}
        customStyle="margin-bottom: 20px; display: flex;"
      />
      <PrimaryButton
        onClick={() => {
          if (!isMyProductor) return window.open(`mailto:${email}`, '_blank');
          return history.push('/register-productor');
        }}
      >
        {isMyProductor ? 'Editar Perfil' : 'Enviar e-mail'}
      </PrimaryButton>
      <Socials
        facebook={facebook}
        instagram={instagram}
        twitter={twitter}
      />
    </Wrapper>
  );
}

const musicalShape = {
  name: PropTypes.string,
  id: PropTypes.string,
};

const locationShape = {
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
};

const historyShape = {
  push: PropTypes.func.isRequired,
};

ProductorBasicInfo.propTypes = {
  history: PropTypes.shape(historyShape).isRequired,
  isMyProductor: PropTypes.bool.isRequired,
  musicalStyles: PropTypes.arrayOf(PropTypes.shape(musicalShape)).isRequired,
  address: PropTypes.shape(locationShape),
  email: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

ProductorBasicInfo.defaultProps = {
  address: null,
};

export default withRouter(ProductorBasicInfo);
