import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import LikeSection from './LikeSection';
import BlogView from './BlogView';
import CommentSection from './CommentSection';

const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'8%',
    paddingRight:'8%'
  },
  tt:{
    margin: theme.spacing.unit*2,
  },
  textField: {
    width:'50%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      image:'',
      auther_name:'',
      auther_thumbnail:'',
      content:[],
      likes: 0,
      loaded:false,
      liked:false,
      comments: [],
      isAuth: false
    };
  }

  componentWillMount(){
    fetch('/api/get_blog',{
      method:"POST",
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({blog_id:this.props.match.params.post_id})
    })
    .then(res => res.json())
    .then(result => 
      (result.success)
      ?(
        (result.got_blog)
        ?(
            this.props.setUser({isAuth:result.isAuth, user:result.user}),
            this.setState({
              title:result.blog.title,
              image:result.blog.featured_image,
              content: result.blog.content,
              likes: result.blog.liked_by.length,
              auther_name: result.auther.username,
              auther_thumbnail: result.auther.thumbnail,
              liked: result.liked,
              comments: result.blog.comments,
              loaded: true,
              isAuth: result.isAuth
            })  
        )
        :(
          this.props.setError('Page not Found'),
          this.props.history.push('/404')
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
    ?(
      <div>
        <div className={classes.root}>
          <BlogView
            image={this.state.image}
            title={this.state.title}
            autherImage={this.state.auther_thumbnail}
            auther={this.state.auther_name}
            content={this.state.content}/>
          <Divider className={classes.tt}/>
          
          <LikeSection
            likes={this.state.likes}
            auther={this.state.auther_name}
            autherImage={this.state.auther_thumbnail}
            blog_id={this.props.match.params.post_id}
            setError={this.props.setError}
            liked={this.state.liked}/>  
          
          <Typography className={classes.tt} variant='h6' color='inherit' noWrap>
            Comments
          </Typography>
          <Divider/>
          <CommentSection
              comments={this.state.comments}
              blog_id={this.props.match.params.post_id}
              isAuth={this.state.isAuth}
              setError={this.props.setError}/>
        </div>
      </div>
      )
    :(<div>Loading...</div>)
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);