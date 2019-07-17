import React from 'react';
import { StoreProvider } from './store/Store';
import AppRouter from './Router';
import Login from './components/modals/Login.modal';
import Register from './components/modals/register/Register.modal';

const App = () => (
  <StoreProvider>
    <AppRouter />
    <Login />
    <Register />
  </StoreProvider>
);

export default App;
