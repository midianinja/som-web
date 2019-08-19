import { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Store from './store/Store';

const Private = ({ children, history }) => {
  const { state } = useContext(Store);
  if (!state.auth) history.push('/');
  return children;
};

Private.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Private);
