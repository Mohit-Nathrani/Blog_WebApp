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
      loaded:false,
      popular: [],
      recent: []
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
        (result.got_homepage)
        ?(
          this.props.setUser({isAuth:result.isAuth, user:result.user}),
          this.setState({
            popular: result.popular,
            recent: result.recent,
            loaded: true
          }),
          console.log(result)
        )
        :(
          this.props.setError('Some Unknown Problem')
        )
      )
      :(
         this.props.setError('Some Unknown Problem')
      )
    )
    .catch(err =>  this.props.setError('Some Server Problem..'));
  }

  navigate(url){
    this.props.history.push(url);
  }

  render(){
    const { classes } = this.props;
    return (
    (this.state.loaded)
    ?(<div>
        <div className={classes.root}>
          <Grid container spacing={16} >
            
            <Grid item md={8} sm={12} >
              <Typography className={classes.title} variant='h6' color='inherit' noWrap>
                  Popular
              </Typography>
              <Divider/>

              {(this.state.popular.length>0)
              ?(
                this.state.popular.map(blog =>
                  <div onClick={() => this.navigate('/blog/'+blog._id)} key={blog._id}>
                    <BlogFrontView
                      title={blog.title}
                      thumbnail={blog.featured_image}
                      auther={blog.auther.username}
                      likes = {blog.liked_by.length}/>
                  </div>
                )
              )
              :(
                <Grid item sm={12}>
                  <Typography variant='subtitle1' color='inherit' noWrap>
                    No Recent Blog posted.
                  </Typography>
                </Grid>
              )
              }

            </Grid>
            
            <Grid item md={4} sm={12}>
              <Typography className={classes.title} variant='h6' color='inherit' noWrap>
                  Recent
              </Typography>
              <Divider/>

              {(this.state.recent.length>0)
              ?(
                this.state.recent.map(blog =>
                  <div onClick={() => this.navigate('/blog/'+blog._id)} key={blog._id}>
                    <SideBlogFrontView
                      title={blog.title}
                      thumbnail={blog.featured_image}
                      auther={blog.auther.username}
                      className={{marginTop:2}}/>
                  </div>
                )
              )
              :(
                <Grid item sm={12}>
                  <Typography variant='subtitle1' color='inherit' noWrap>
                    No Recent Blog posted.
                  </Typography>
                </Grid>
              )
              }
            </Grid>
          </Grid>
        </div>
      </div>
    )
    :(<div></div>)
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);