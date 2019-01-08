import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import BlogFrontView from './BlogFrontView';
import SideBlogFrontView from './SideBlogFrontView';


const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'5%',
    paddingRight:'5%'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  }
});

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tt:''
    };
  }

  componentWillMount(){
    fetch('/api/home',{
      method:"POST",
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({get:true})
    })
    .then(res => res.json())
    .then(result =>
      (result.success)
      ?(
        (result.isAuth)
        ?(
          this.props.setUser({isAuth:true, user:result.user})
        )
        :(
          this.props.setUser({isAuth:false})
        )
      )
      :(
         this.props.setError('Some Unknown Problem')
        //this.setState({isError: true, errorMsg: 'Some Unknown Problem' })
      )
    )
    .catch(err =>  this.props.setError('Some Server Problem..'));
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Grid container spacing={16} >
            
            <Grid item md={8} sm={12} >
              <Typography className={classes.title} variant='h6' color='inherit' noWrap>
                  Popular
              </Typography>
              <Divider/>
              <BlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
              content='content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. content .. 
              content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
              <BlogFrontView to='/2' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/3' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/4' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/5' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/5' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/6' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/7' title='Making title' content='content .. content .. content .. content .. content .. '/>
              <BlogFrontView to='/8' title='Making title' content='content .. content .. content .. content .. content .. '/>
            </Grid>
            
            <Grid item md={4} sm={12}>
              <Typography className={classes.title} variant='h6' color='inherit' noWrap>
                  Recent
              </Typography>
              <Divider/>
              <SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
              content='content .. content .. content .. content .. content .. 
              content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>

              <SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
              content='content .. content .. content .. content .. content .. 
              content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>

              <SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
              content='content .. content .. content .. content .. content .. 
              content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);