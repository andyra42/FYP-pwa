import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Home, Details} from './pages';
import {connect} from 'react-redux';
import {updateUser} from './actions/auth';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import firebase from 'firebase';
import './App.css';

const google = window.google;
google.charts.load('current', {packages: ['line']});

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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  grow:{
    flexGrow:0.2
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
});

class AppBar extends Component {
  render() {
    const {onMobileDrawerToggle, history, location, classes} = this.props;

    let appBarIcon;
    if (location.pathname === '/') {
      appBarIcon =
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMobileDrawerToggle}
            className={classes.drawerIcon}
          >
            <MenuIcon />
          </IconButton>;
    } else {
      appBarIcon =
          <IconButton
            color="inherit"
            aria-label="back"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </IconButton>;
    }

    return (
      <MaterialAppBar className={classes.appBar}>
        <Toolbar>
          {appBarIcon}
          <Typography variant="title" color="inherit" noWrap>
            App
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <Input
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </MaterialAppBar>
    );
  }
}
AppBar = withRouter(AppBar);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleChartsLoaded: false,
      mobileDrawerOpen: false
    };
  }

  onSignInAnonymouslyClick = () => {
    firebase.auth().signInAnonymously();
  };

  onGoogleChartsLoaded = () => {
    this.setState({googleChartsLoaded: true});
  };

  onMobileDrawerToggle = () => {
    this.setState(state => ({mobileDrawerOpen: !state.mobileDrawerOpen}));
  };

  componentDidMount() {
    this.unsubscribeAuthChanged = firebase.auth().onAuthStateChanged(user => {
      this.props.updateUser(user);
    });

    google.charts.setOnLoadCallback(this.onGoogleChartsLoaded);
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

    if (!this.state.googleChartsLoaded) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Router>
          <div className={classes.root}>
            <AppBar onMobileDrawerToggle={this.onMobileDrawerToggle} classes={classes} />
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
              <Route path="/" exact component={Home} />
              <Route path="/stockDetails/:stockCode" component={Details} />
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(App));
