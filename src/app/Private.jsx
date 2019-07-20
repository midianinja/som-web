import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { verifyAuth } from './utilities/auth.utils';


const Private = ({ children, history }) => {
  useEffect(() => {
    const verify = async () => {
      const token = window.localStorage.getItem('som@token');
      if (token) {
        const validated = await verifyAuth(token);
        if (!validated) history.push('/');
      } else {
        history.push('/');
      }
    };
    verify();
  });
  return children;
};

Private.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Private);
