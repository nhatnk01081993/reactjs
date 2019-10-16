import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
// import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
// import PasswordForgetPage from '../PasswordForget';
// import HomePage from '../Home';
// import AccountPage from '../Account';
// import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const App = () => (
    <Router>
        <div>
            <Navigation />

            {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            {/* <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} /> */}
            {/* <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
        </div>
    </Router>
);

export default function FixedContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography component={App} style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </React.Fragment>
    );
}