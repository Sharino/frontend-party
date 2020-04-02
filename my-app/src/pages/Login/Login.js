import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { userActions } from '../../_actions'
import { CustomInput } from '../../_components'
import { Button, Grid, InputAdornment, FormControl } from '@material-ui/core'

 import { Person, Lock } from '@material-ui/icons'

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
    width: '100%',
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

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout()

        this.state = {
            username: 'Username',
            password: 'Password',
            submitted: false,
            error: false
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
            
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ submitted: true })
        const { username, password } = this.state
        if (username && password) {
            this.props.login(username, password)
        }
    }

    render() {
        const { classes } = this.props
        const { username, password } = this.state
        return (
          <Grid container component="main" className={classes.root} alignItems={'center'} justify={'center'}>
            <Grid container item className={classes.formContainer} justify={'center'}>
              <img src={Logo} className={classes.appLogo} alt="logo" />
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
          </Grid>
        );
    }
}



const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(()=>{return {}}, actionCreators)(withStyles(styles)(LoginPage))
export { connectedLoginPage as LoginPage }