import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './modules/Main';
import FilesFieldSet from './components/views/FilesFieldSet';

const history = createBrowserHistory();

history.listen(() => {});
const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={FilesFieldSet} />
        </Switch>
    </Router>
);

export default AppRouter;
