import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core'
import { userActions } from '../../_actions';
import { Button, Grid, InputAdornment, FormControl, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

 import { Person, Lock } from '@material-ui/icons';

import Background from '../../assets/images/background.svg'
import Logo from '../../assets/images/logo.svg'

const styles = (theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  formContainer: {
      flexGrow: 0,
      width: 363
  },
  appLogo: {
    marginBottom: 60
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& :not(*:first-child)': {
      marginTop: 8
    }
  },
  submit: {
    height: 58,
    backgroundColor: '#9FD533',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#86b300'
    }
  }
  
});

const CustomInput = withStyles({
  root: {
    overflow: 'hidden',
    color: '#B3B3B3',
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 8,
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&$focused': {
      color: '#999',
      backgroundColor: '#fff'
    },
  },
  focused: {
    backgroundColor: '#fff'
  }
})(Input);

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: 'Username',
            password: 'Password',
            submitted: false,
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
            
    }



    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
        }
    }

    render() {
        const { classes, loggingIn } = this.props;
        const { username, password } = this.state;
        return (
          <Grid container component="main" className={classes.root} alignItems={'center'} justify={'center'}>
            <Grid container item className={classes.formContainer} justify={'center'}>
              <img src={Logo} className={classes.appLogo} alt="logo" />
              {loggingIn}
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <FormControl fullWidth>
                  <CustomInput
                    variant="filled"
                    id="username"   
                    name="username"               
                    disableUnderline
                    defaultValue={username}
                    onChange={this.handleChange}
                    startAdornment={<InputAdornment position="start"><Person/></InputAdornment>}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <CustomInput
                    variant="filled"
                    id="standard-adornment-weight"
                    name="password"
                    disableUnderline
                    type="password"
                    defaultValue={password}
                    onChange={this.handleChange}
                    startAdornment={<InputAdornment position="start"><Lock/></InputAdornment>}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </Button>
                </FormControl>
              </form>
            </Grid>
            {/* <Backdrop className={classes.backdrop} open={loggingIn}>
              <CircularProgress color="inherit" />
            </Backdrop> */}
            
          </Grid>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage };