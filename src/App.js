import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AppCreateReactApp from './components/create_react_app/App';
import './App.css';

const drawerWidth = 240;

const styles = theme => ({
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

  onMobileDrawerToggle = () => {
    this.setState(state => ({mobileDrawerOpen: !state.mobileDrawerOpen}));
  };

  render() {
    const {classes} = this.props;

    const drawer = (
      <div></div>
    );

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
            <Route path="/" component={AppCreateReactApp} />
          </Router>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
