import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import SideBlogFrontView from './SideBlogFrontView';

const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'10%',
    paddingRight:'10%'
  },
  bigAvatar: {
    width: 160,
    height: 160,
  },
  TopSpace: {
  	paddingTop: theme.spacing.unit*5
  }
});


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      email:'',
      posts:[],
      thumbnail:'',
      loaded:false,
    };
    
  }

  componentWillMount(){
    fetch('/api/profile',{
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
            this.props.setUser({isAuth:true, user:result.user}),
            this.setState({
              username: result.user.username,
              email: result.user.email,
              thumbnail: result.user.thumbnail,
              loaded: true
            })
        )
        :(
          this.props.setUser({isAuth:false}),
          this.props.setError('Please Login First...'),
          (this.props.history.length === 2)
          ?this.props.history.push('/')
          :this.props.history.goBack()
        )
      )
      :(
        this.props.setError('Some Unknown Problem')
      )
    )
    .catch(err =>  this.props.setError('Some Server Problem'));
  }

  render() {
  	const {classes} = this.props;
    return (
    (this.state.loaded)
      ?(<div>
        <div className={classes.root}>
        	<div>
        	<Grid container spacing={24}>
	        	<Grid item md={3} sm={12} container direction='row' justify='center'>
	        		<Avatar src={this.state.thumbnail} className={classes.bigAvatar}/>
	          	</Grid>
	          	
		      	<Grid item sm={12} md={3} container>
	            	<Grid item xs container direction='column' justify='center' spacing={16} >
	                	<Typography gutterBottom variant='subtitle1'>
	                  		{this.state.username}
	                	</Typography>
	                	<Typography gutterBottom>{this.state.email}</Typography>
	                	<Typography gutterBottom>{this.state.posts.length} posts</Typography>
	              	</Grid>
          		</Grid>
	        </Grid>
	        </div>


        	<div className={classes.TopSpace}>
        	<Typography variant='h6' color='inherit' noWrap>
            	Your Blogs
        	</Typography>
        	<Divider/>
	        <Grid container spacing={24}>
	        	<Grid item md={6} sm={12} >
	            	<SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
            		content='content .. content .. content .. content .. content .. 
            		content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            	</Grid>
            	<Grid item md={6} sm={12} >
	            	<SideBlogFrontView to='/1' title='Title Making Title Making Title' 
            		content='content .. 
            		content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            	</Grid>
            	<Grid item md={6} sm={12} >
	            	<SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
            		content='content .. content .. content .. content .. content .. 
            		content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            	</Grid>
            	<Grid item md={6} sm={12} >
	            	<SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
            		content='content .. content .. content .. content .. content .. 
            		content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            	</Grid>
            	<Grid item md={6} sm={12} >
	            	<SideBlogFrontView to='/1' title='Making Title Making Title Making Title Making Title Making Title Making Title Making Title Making Title' 
            		content='content .. content .. content .. content .. content .. 
            		content .. content .. content .. content .. content .. ' auther={'MAk erve'} className={{marginTop:2}}/>
            	</Grid>
	        </Grid>
	        </div>
      	</div>
      </div>
    )
    :(<div></div>)
  );}
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
