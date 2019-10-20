import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';


const SignInPage = () => (
    <div>
        <SignInForm />
    </div>
);

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
}));


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <Grid item xs={4}>
                    <div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <form onSubmit={this.onSubmit}>
                        <Box boxShadow={3} alignItems="center" display="flex" flexDirection="column" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                            <Avatar alt="Remy Sharp" src="https://genknews.genkcdn.vn/2016/photo-1-1482990145725.jpg" style={{ width: 100, height: 100 }} />
                            <br />

                            <Box p={1} width="75%" >
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Email"
                                    className={useStyles.textField}
                                    margin="dense"
                                    onChange={this.onChange}
                                    value={email}
                                    name="email"
                                    type="email"
                                    fullWidth="true"
                                />
                            </Box>
                            <Box p={1} width="75%" >
                                <TextField
                                    required
                                    id="standard-required"
                                    label="PassWord"
                                    className={useStyles.textField}
                                    margin="dense"
                                    onChange={this.onChange}
                                    value={password}
                                    name="password"
                                    type="password"
                                    fullWidth="true"
                                />
                            </Box>

                            <Box p={1}>
                                <Button disabled={isInvalid} type="submit" variant="outlined" color="primary">
                                    Sign In
                                </Button>
                                <br />

                            </Box>
                            <div style={{ height: 18 }}></div>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // className={classes.button}
                                    startIcon={<FacebookIcon />}
                                    width='100%'
                                >
                                    Facebook
                                </Button>
                            </Box>
                            <Box>

                                <SignUpLink />
                            </Box>
                            <Box bgcolor="secondary.main">
                                {error && <p>{error.message}</p>}
                            </Box>
                        </Box>
                    </form></Grid>
                <Grid item xs={4}>
                    <div >
                    </div>
                </Grid>
            </div>
        );
    }
}


const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };