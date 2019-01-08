import React from 'react';
import {BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';  
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import Home from './components/Home';
import Profile from './components/Profile';
import AddBlog from './components/AddBlog';
import AddBlog2 from './components/AddBlog2'
import Blog from './components/Blog'
import NotFound from './components/NotFound'


const drawerWidth = 205;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 0.95,
  }
});

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

function TopAvatar(props) {
  if (props.isAuth) {
    return(
      <Chip
        avatar={<Avatar src={props.thumbnail}/>}
        label={props.username}/> 
    ); 
  }
  else {
    return(
    <Button color='inherit' href='http://localhost:3001/auth/google'>
      Login
    </Button>
    );
  }
}

class App extends React.Component {
  state = {
    open: false,
    isAuth:false,
    username:'',
    thumbnail:'',
    isError:false,
    errorMsg:''
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getUser = (userinfo) => {
    if(userinfo.isAuth){
      this.setState({
        isAuth:true,
        username: userinfo.user.username,
        thumbnail: userinfo.user.thumbnail
      });
    }
    else{
      this.setState({isAuth:false}); 
    }
  }

  handleTransitionOpen = (errorMsg) => {
    this.setState({ isError: true, errorMsg: errorMsg });
  }

  handleTransitionClose = () => {
    this.setState({ isError: false });
  };

  navigate = (uri) => {
    if(this.state.isAuth){
      //
    }
    else{
      this.handleTransitionOpen('Please Login First...');
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}>

          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap className={classes.grow}>
              Blog WebApp
            </Typography>
            <TopAvatar isAuth={this.state.isAuth} username={this.state.username} thumbnail={this.state.thumbnail}/>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant='permanent'
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          
          <List>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img alt='Homee' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfAAAAXwBsrqMZwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGVSURBVEiJ5ZWxS8NAFMa/dykOjhUcCl2K4Cp0cJD+Aw6ioJ0ck5B0KNS/ILOL4HLlhro4CkUHlzpI0YJDB0cXhw4dBCki6BDuzsFUak160dZB/Kbj3vt+3yX3QoC/LkrbWKlU8mEYngAAEe0IIXozC/A8b00pdQpgIdp6BLAphLgyeZmpwXGcslLqYgSOaN1yHKds8luTiq7rVolIAJiLKWeIaLtYLL52u93rJEbsKwqCgPX7/QMAVdMJIx3mcrlaEATKGOC67jwRHWutt1LC30FETa31rhDiJTHA87xFpdQZgNXvwEd0wxjbqNfrD18CfN9fllKeAyj8ED7UvWVZ65zzOyCaItu2S1LKzgzgAFCQUnZs2y59BDDGjgBkZwAfKssYawDxl6xjDD0iqmmt2wCgtS4R0T6ApfFGIcQnZibFaXqWZa1wzgcje03f9y+llLcA8pPMxi+ZiGpjcAAA53xARHsmvzEgDMNWUk1rnVhLHdBoNJ6TakKIp6kDptWvBxinKGFsUyvuCYw/kQlqT+H9r3oDE+WBcyGyY6YAAAAASUVORK5CYII='/>
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
            </NavLink>
            <NavLink to='/profile' style={{ textDecoration: 'none' }}>  
              <ListItem button>
                <ListItemIcon>
                  <img alt='Profile' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfAAAAXwBsrqMZwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFOSURBVEiJ7ZK/SsNgFMV/n0lo6AO42L6BSjEPUKkOvoBvUEIH6yAWHDMr0iFQMNDOougsggg+QBeXDm4FCwUVdJBAkutSoZXmD0QEoWf77rnn/ODjwn+XlnWxXq/XLMs6tyzrpd/vD7LmVJYl27aPgdbkOVZKtYrF4mW73f7MDbBtexe4mGMNwzCsdbvdp6T8UhoA2IuZlzVNO00LZwGsJ3jV3wDoCV7qF6cCROQuwbvNDVBKHQFvc6xXwzAOcgM8zxsAFeAa+ADegStd1yudTmeYll8oVbFn5jiOPhqNqlEUbQIbSqkysDyxxyIyBPoicl8qlR4cxwkyAZrNZsH3/X3gcKowTWMROTFN03Vd148FNBqNlSiKboDVjMU/9RgEwU6v13v+HsycaRiGXo5ygDXDMM6mBzMApdRWjnIARGQ7FgAU8gIAMwmw0N/rCyatYo55Vz6CAAAAAElFTkSuQmCC'/>
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>
            </NavLink>
            <NavLink to='/addblog_simple' style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'Add Blog (Simple)'} />
              </ListItem>
            </NavLink>
            <NavLink to='/addblog_markdown' style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img alt='Add Blog' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfAAAAXwBsrqMZwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEESURBVEiJ7ZNNTsMwEIXfc3oMUAX3QCplyzFiqxsuw6KKfRB2/IhyDjalt7AybGI0da00JAiQ4Ntk5s1P8jQK8M8RqBNr7TXJWwBnI/e9krzx3t8lwey9jVxPWA4A5yKy1sIsazgFAGPMZYzRGGPudZxqTdM85Zvrul52PXOtm7wRANq2jVVVxTxOeWlG9/Q5SGxEpBQDwMY5dzCQ9XxQdPCVFB2EEFjSj+GcO7DxMw4S1tpHkouUk3zw3l/pmtZK9DogufcBIjJTtUWnLUc7CCFc9NWH8HtvMJTRNwDw0j2f+3aMvsHQ+3z7Dd4AnJT+yE+w1UnuYAVgN2H5juRqwvxf5B3fZV4s2yrLzAAAAABJRU5ErkJggg=='/>
                </ListItemIcon>
                <ListItemText primary={'Add Blog'} />
              </ListItem>
            </NavLink>
            <a href="http://localhost:3001/auth/logout" style={{ textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <img alt='Logout' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfAAAAXwBsrqMZwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEtSURBVEiJ7ZS9SsRAFIXPyfoANmIlopW76AMYENTCysKHyEzS7MtYLJkwjyFWIqKwgp3NphBsZAWt9gHkjoUEdkPi4M6ujX5dbs49H0N+gH88cPpCKXVK8hzA1px9zyT7xpjLahDN2MhBQDkAbDvnBtODqBbYCCiv2PxOsHBCBfcAJssSDIuiiEUkBvC2DEFPa71jrS1JHrdJQgSrAG611nvGmBHJAwCv9dCKryWKoqM8z298OWPMk1LqjOTDzL5vUUQ+fJmKTqfD+sx7AgB3Wuu2e+8kT4wxj1mW7YrIxTyCNiYicmitLdM07YnIFYC1eijkIY+stWWSJF3n3DWA9aZQyAlirfUQQBdfb1QjIQIA2PcFfv1fNF5A50urwDmXoeFr/AFjklnA/l/kEwnQVBXj4UWpAAAAAElFTkSuQmCC'/>
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </a>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            <Route exact path='/' 
                   render={(props) => <Home {...props} 
                   setUser={this.getUser} 
                   setError={this.handleTransitionOpen}/>}
            />
            <Route path='/profile' 
                   render={(props) => <Profile {...props} 
                   setUser={this.getUser} 
                   setError={this.handleTransitionOpen}/>}
            />
            <Route path='/addblog_markdown' 
                   render={(props) => <AddBlog {...props} 
                   setUser={this.getUser}
                   setError={this.handleTransitionOpen}
                   resetError={this.handleTransitionClose}/>}
            />
            <Route path='/addblog_simple' 
                   render={(props) => <AddBlog2 {...props} 
                   setUser={this.getUser}
                   setError={this.handleTransitionOpen}/>}
            />
            <Route path='/blog/:post_id' 
                   render={(props) => <Blog {...props} 
                   setUser={this.getUser}
                   setError={this.handleTransitionOpen}/>}
            />
            <Route path='/404' 
                   render={(props) => <NotFound {...props} 
                   setUser={this.getUser}
                   setError={this.handleTransitionOpen}/>}
            />
          </Switch>
        </main>
        <Snackbar
          open={this.state.isError}
          onClose={this.handleTransitionClose}
          TransitionComponent={Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id='message-id'>{this.state.errorMsg}</span>}/>
      </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);