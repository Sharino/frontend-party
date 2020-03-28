import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Background from '../assets/images/background.svg'
import Logo from '../assets/images/logo.svg'

const useStyles = makeStyles((theme) => ({
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    height: 58,
    backgroundColor: '#9FD533',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#86b300'
    }
  },
}));
const CustomTextField = (props) => {
  const classes = useStylesReddit();
  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
const useStylesReddit = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    color: '#B3B3B3',
    borderRadius: 4,
    backgroundColor: '#fff',
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
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} alignItems={'center'} justify={'center'}>
      <Grid container item className={classes.formContainer} justify={'center'}>
        <img src={Logo} className="App-logo" alt="logo" />
        <form className={classes.form} noValidate>
          <CustomTextField
            variant="filled"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <CustomTextField
            variant="filled"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            margin="normal"
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}