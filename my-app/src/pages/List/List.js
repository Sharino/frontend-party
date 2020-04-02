import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { serverActions } from '../../_actions'
import { Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core'

import Logo from '../../assets/images/logo-dark.svg'
import Logout from '../../assets/images/logout.svg'

import { EnhancedTable as Table } from '../../_components'

const styles = (theme) => ({
  appHeader: {
      height: 112,
      marginLeft: 18,
      marginRight: 18
  },
  logoutBtn: {
    textDecorationLine: 'none',
    '&:active': {
      color: 'inherit'
    },
    '& :hover': {
      backgroundColor: '#99cc33'
    }
  }
});

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { classes, servers } = this.props
    return (
      <Grid container component="main" className={classes.root}>
        <Grid container component="header" justify={'space-between'} alignItems={'center'} className={classes.appHeader}> 
          <img src={Logo} alt="logo" />
          <Link to="/login" className={classes.logoutBtn}>
            <Button startIcon={<img src={Logout} alt="logout-logo"/>}>
                Log out
            </Button>
          </Link>     
        </Grid>
        <Grid container >
          <Table 
            rows={servers}
          />
        </Grid>
      </Grid>
    );
  }
}

function mapState(state) {
    const { servers } = state;
    return { servers };
}

const actionCreators = {
    getAll: serverActions.getList
}

const connectedHomePage = connect(mapState, actionCreators)(withStyles(styles)(HomePage));
export { connectedHomePage as HomePage };