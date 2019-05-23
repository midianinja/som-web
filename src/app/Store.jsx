import React from 'react';

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
    console.log('iae provider');
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
