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
      blogs:[],
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
              blogs: result.blog_details, 
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

  navigate(url){
    this.props.history.push(url);
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
	                	<Typography gutterBottom>{this.state.blogs.length} blogs</Typography>
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
            {(this.state.blogs.length>0)
              ?(
  	        	  this.state.blogs.map(blog =>
                  <Grid item md={6} sm={12} key={blog.id} onClick={() => this.navigate('/blog/'+blog.id)}>
    	            	<SideBlogFrontView
                      title={blog.title}
                      thumbnail={blog.featured_image}
                      auther={this.state.username}
                      className={{marginTop:2}}/>
                	</Grid>
                )
              )
              :(
                <Grid item sm={12}>
                  <Typography variant='subtitle1' color='inherit' noWrap>
                    No Blog posted yet
                  </Typography>
                </Grid>
              )
            	}
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
