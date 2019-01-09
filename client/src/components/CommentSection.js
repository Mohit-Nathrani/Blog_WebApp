import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Comment from './Comment'


const styles = theme => ({
  textField: {
    margin: theme.spacing.unit
  },
  tt:{
    margin: theme.spacing.unit*2,
  },
  leftb:{
    borderLeft: "1px solid #222"
  }
});


class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:this.props.comments,
      my_comment:'',
      submitting: false
    };
  }

  handleChange = (event) => {
    event.persist()
    if(event.target.value.length <= 300){
      this.setState({[event.target.name]: event.target.value});
    }
    else{
      this.props.setError('You reached maximum input capacity.');
    }
  }

  handleSubmit =() => {
    this.setState({submitting:true});
    if(this.state.my_comment.length===0){
      this.props.setError('Empty comments not allowed.');
      this.setState({submitting:false});
    }
    else{
      fetch('/api/post_comment',{
        method:"POST",
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          blog_id:this.props.blog_id,
          text: this.state.my_comment
        })
      })
      .then(res => res.json())
      .then(result => 
        (result.success)
        ?(
          (result.comment_created)
          ?(
              this.setState(prevState => ({
                comments: [
                        {_id:result.comment_id,
                          text:this.state.my_comment,
                          reply:[],
                          auther_name: 'You',
                          level:0
                        }].concat(prevState.comments),
                my_comment: '',
                submitting: false
              }))
          )
          :(
            this.props.setError(result.error),
            this.setState({submitting:false})

          )
        )
        :(
          this.props.setError('Some Unknown Problem'),
          this.setState({submitting:false})
        )
      )
      .catch(err => {
        this.props.setError('Some Server Problem')
        this.setState({submitting:false});
      });
    }
  }

  render() {
    const {classes} = this.props;  
    return (
      <div>
      {(this.props.isAuth)
      ?(<div>
          <Grid container>   
            <Grid item container>
              <TextField
                id="outlined-textarea"
                placeholder="Comment"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                name="my_comment"
                value={this.state.my_comment}
                onChange={this.handleChange}/>
            </Grid>
            <Grid item container>
              <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.state.submitting}>
                Submit Comment
              </Button>
            </Grid>
          </Grid>
            <Divider className={classes.tt}/>
        </div>
      )
      :(<div></div>)}
      {(this.state.comments.length > 0 && this.state.comments.map((child) => {
        return (
          <Grid container spacing={24} key={child._id}>
            <Grid item xs>
              <Comment comment={child} setError={this.props.setError} isAuth={this.props.isAuth}/>
            </Grid>
          </Grid>
        )
      }))}
      </div>
    );
  }
}

CommentSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSection);