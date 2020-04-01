import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../../assets/images/logo-dark.svg'
import Logout from '../../assets/images/logout.svg'

import Table from '../../components/Table'

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  appHeader: {
      height: 112,
      marginLeft: 18,
      marginRight: 18
  },
  logoutBtn: {
    '&:hover': {
      backgroundColor: '#99cc33'
    }
  }
}));

const HomePage = (props) => {
  const classes = useStyles();
  const { user, users } = props;

  return (
    <Grid container component="main" className={classes.root}>
      <Grid container component="header" justify={'space-between'} alignItems={'center'} className={classes.appHeader}> 
        <img src={Logo} alt="logo" />
        
        <Link to="/login">
          <Button 
            startIcon={<img src={Logout} alt="logout-logo"/>}
            className={classes.logoutBtn}>
              Log out
          </Button>
        </Link>
        
     
      </Grid>
      <Grid container >
        <Table />
      </Grid>
    </Grid>
  ); 
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };