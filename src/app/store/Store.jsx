import React from 'react';
import PropTypes from 'prop-types';

const Store = React.createContext();

const initialState = {
  auth: null,
  modals: {
    login: false,
    register: false,
    navigation: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NAVIGATION_MODAL':
      return { ...state, modals: { ...initialState.modals, navigation: true } };
    case 'SHOW_LOGIN_MODAL':
      return { ...state, modals: { ...initialState.modals, login: true } };
    case 'SHOW_REGISTER_MODAL':
      return { ...state, modals: { ...initialState.modals, register: true } };
    case 'CLOSE_MODAL':
      return { ...state, modals: { ...initialState.modals } };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, { ...initialState });
  const value = { state, dispatch };
  const { children } = props;
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

StoreProvider.defaultProps = {
  children: [],
};

export default Store;
