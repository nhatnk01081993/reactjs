import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const SignUpPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '5rem', height: '5rem' },
};
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
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

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
                  id="standard-required"
                  label="Full Name"
                  className={useStyles.textField}
                  margin="dense"
                  onChange={this.onChange}
                  value={username}
                  name="username"
                  fullWidth="true"
                />
              </Box>
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
                  value={passwordOne}
                  name="passwordOne"
                  type="password"
                  fullWidth="true"
                />
              </Box>
              <Box p={1} width="75%" >
                <TextField
                  required
                  id="standard-required"
                  label="Confirm PassWord"
                  className={useStyles.textField}
                  margin="dense"
                  onChange={this.onChange}
                  value={passwordTwo}
                  name="passwordTwo"
                  type="password"
                  fullWidth="true"
                />
              </Box>
              <Box p={1}>
                <Button disabled={isInvalid} type="submit" variant="outlined" color="primary">
                  Sign Up
                </Button>
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

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };