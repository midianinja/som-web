import React from 'react';
import { StoreProvider } from './store/Store';
import AppRouter from './Router';
import Login from './components/modals/login/Login.modal';
import ForgetPasswordModal from './components/modals/forgetPassword/ForgetPassword.modal';
import Register from './components/modals/register/Register.modal';
import Navigation from './components/modals/Navigation';


const App = () => (
  <StoreProvider>
    <AppRouter>
      <Login />
      <ForgetPasswordModal />
      <Register />
      <Navigation />
    </AppRouter>
  </StoreProvider>
);

export default App;
