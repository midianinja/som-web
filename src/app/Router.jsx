import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './modules/Main';
import ConfirmationPage from './components/views/RegisterSplashScreen';

const history = createBrowserHistory();

history.listen(() => {});
const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={() => <ConfirmationPage name='Caetano' />} />
        </Switch>
    </Router>
);

export default AppRouter;
