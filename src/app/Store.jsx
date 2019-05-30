import React from 'react';
import PropTypes from 'prop-types';

export const Store = React.createContext();

const initialState = {
    todos: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
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
