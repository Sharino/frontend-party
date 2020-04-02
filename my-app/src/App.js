import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Snackbar, IconButton, Backdrop, CircularProgress } from '@material-ui/core'
 import { Close } from '@material-ui/icons'

import { history } from './_helpers'
import { alertActions } from './_actions'
import { PrivateRoute } from './_components'

import { LoginPage } from "./pages/Login"
import { HomePage } from "./pages/List"

import { styled } from '@material-ui/core/styles'

const StyledBackdrop = styled(Backdrop)({
    zIndex: 777,
    color: '#fff',
});

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.props.clearAlerts();
    };

    render() {
        const { alert, loggingIn } = this.props
        return (
          <div className="App">
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={alert.type === 'alert-danger'}
              autoHideDuration={6000}
              onClose={this.handleClose}
              message={alert.message}
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                    <Close fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            <StyledBackdrop open={loggingIn || false}>
              <CircularProgress color="inherit" />
            </StyledBackdrop>
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route exact path='/login' component={LoginPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div>
        );
    }
}

function mapState(state) {
    const { alert } = state
    const { loggingIn } = state.authentication
    return { alert, loggingIn }
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    errorAlert: alertActions.error
};

const connectedApp = connect(mapState, actionCreators)(App)
export default connectedApp
