import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Home, Details} from './pages';
import {connect} from 'react-redux';
import {updateUser} from './actions/auth';
import firebase from 'firebase';
import './App.css';

const mapStateToProps = state => ({
  uid: state.get('auth').get('uid')
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => {dispatch(updateUser(user))}
});

const drawerWidth = 240;

const styles = theme => ({
  loginRoot: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  root: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileDrawerOpen: false
    };
  }

  onSignInAnonymouslyClick = () => {
    firebase.auth().signInAnonymously();
  };

  onMobileDrawerToggle = () => {
    this.setState(state => ({mobileDrawerOpen: !state.mobileDrawerOpen}));
  };

  componentDidMount() {
    this.unsubscribeAuthChanged = firebase.auth().onAuthStateChanged(user => {
      this.props.updateUser(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuthChanged();
  }

  render() {
    const {uid, classes} = this.props;

    const drawer = (
      <div></div>
    );

    if (!uid) {
      return (
        <div className={classes.loginRoot}>
          <Button onClick={this.onSignInAnonymouslyClick} variant="contained">Sign In Anonymously</Button>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.onMobileDrawerToggle}
              className={classes.drawerIcon}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              App
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.state.mobileDrawerOpen}
            onClose={this.onMobileDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/stockDetails/:stockCode" component={Details} />
            </div>
          </Router>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(App));
