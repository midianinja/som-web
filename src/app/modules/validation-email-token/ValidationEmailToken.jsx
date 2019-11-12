import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { validateToken } from './repository';

function ValidationEmailToken(props) {
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
    const { data, error } = await promise.json();
    console.log(data, error);
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
