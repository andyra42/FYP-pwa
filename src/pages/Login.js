import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  loginRoot: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: '50px',
    paddingRight: '50px',
    width: '100%'
  },
  loginBtn: {
    width: '100%'
  }
});

class LoginPage extends Component {
  render() {
    const {classes} = this.props;
    
    return (
      <div className={classes.loginRoot}>
        <img
          src="/fb_login.png"
          onClick={this.props.onSignInFacebookClick}
          className={classes.loginBtn} />
      </div>
    );
  }
}

export default withStyles(styles)(LoginPage);
