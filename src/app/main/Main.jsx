import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Store from '../store/Store';
import { fetchLoggedUser, verify } from './MainController';

const Wrapper = styled.div`
  width: 100%;
`;

const Main = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const [ida, setIDA] = useState(null);

  useEffect(() => {
    if (state.loading.verify) verify(dispatch, setIDA);
  }, []);

  useEffect(() => {
    if (ida) fetchLoggedUser(ida, dispatch);
  }, [ida]);

  if (state.loading.auth || state.loading.verify) return null;
  return <Wrapper>{children}</Wrapper>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
