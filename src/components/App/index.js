import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
        <div>
            <Navigation />

            <hr />

            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </div>
    </Router>
);

export default withAuthentication(App);