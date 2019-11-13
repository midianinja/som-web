import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Store from '../../store/Store';
import { validateToken } from './repository';
import { fetch } from './controller';

function ValidationEmailToken(props) {
  const { dispatch } = useContext(Store);
  const { history, match } = props;
  const { ida } = match.params;
  const token = history.location.search.split('=')[1];
  const validate = async () => {
    let promise;
    try {
      promise = await validateToken(ida, token);
    } catch (err) {
      throw err;
    }

    const { error } = await promise.json();
    if (error) {
      window.localStorage.setItem('som@ida', '');
      window.localStorage.setItem('som@token', '');

      dispatch({ type: 'SET_AUTH', auth: null });
      dispatch({ type: 'SET_USER', user: null });

      history.push('/welcome');
    }

    fetch(ida, history, dispatch);
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <div />
  );
}

const routerParamsShape = {
  params: PropTypes.string,
};

const historyShape = {
  push: PropTypes.func,
};

ValidationEmailToken.propTypes = {
  match: PropTypes.shape(routerParamsShape).isRequired,
  history: PropTypes.shape(historyShape).isRequired,
};

export default withRouter(ValidationEmailToken);
