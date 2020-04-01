import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import store from './store'
import { Button, Snackbar, IconButton } from '@material-ui/core';
 import { Close } from '@material-ui/icons';

import { history } from './_helpers'
import { alertActions } from './_actions'
import { PrivateRoute } from './_components'

import { LoginPage } from "./pages/Login"
import { HomePage } from "./pages/List"


// import logo from './logo.svg';
// import './App.css';
class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
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
        const { alert } = this.props;
        return (
          <div className="App">
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={alert && alert.message}
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

// const App = () => (
//   <Provider store={store}>
//     <div className="App">
//       <Router>
//         <Route exact path='/' component={Login} />
//         <Route exact path='/List' component={List} />
//       </Router>
//     </div>
//   </Provider>
// )

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;
