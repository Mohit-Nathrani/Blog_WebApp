import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NavigationIcon from '@material-ui/icons/Navigation';
import Slide from '@material-ui/core/Slide';

import BlogView from './BlogView'


const initialSource = `# Demo
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Pretty neat, eh?


## Changes are automatically rendered as you type.
* Blog WebApp designed in Reactjs
* Renders actual, "native" React DOM elements

## Add Image
<img src="https://www.w3schools.com/howto/img_paris.jpg" alt="Paris"></img>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`
## Tables?
| Column-1  | Column-2 |
| --------------- | ------- |
| Abcdef       | cghij |
| Anything    | in      |
| wewt          | React |
`

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'10%',
    paddingRight:'10%'
  },
  spacing:{
    padding: 20,
    paddingLeft:'5%',
    paddingRight:'5%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  markdown:{
    width:'100%',
    height: '70%'
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  ll: {
    width:'100%'
  },
  topspace:{
    marginTop: theme.spacing.unit*2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const size_map = {'title':180, 'image':400, 'content': 20000};

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      image:'',
      content:initialSource,
      open:false,
      loaded:false,
      auther_username: '',
      auther_thumbnail: '',
      publishing:false
    };
  }

  componentWillMount(){
    fetch('/api/check_login',{
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
              loaded: true,
              auther_username: result.user.username,
              auther_thumbnail: result.user.thumbnail
            })
        )
        :(
          this.props.setUser({isAuth:false}),
          this.props.setError('Please Login First...'),
          this.props.history.push('/')
        )
      )
      :(
        this.props.setError('Some Unknown Problem')
      )
    )
    .catch(err =>  this.props.setError('Some Server Problem'));
  }

  validate(){
    if(this.state.title === ''){
      this.props.setError('Title is empty.');
      return false;
    }
    else if(this.state.image === ''){
      this.props.setError('Featured image is required.');
      return false;
    }
    else if(this.state.content === ''){
      this.props.setError('Blog content is Empty.');
      return false;
    }
    return true;
  }

  handleClickOpen = () => {
    if(this.validate()){
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    event.persist()
    this.props.resetError();
    if(event.target.value.length <= size_map[event.target.name]){
      this.setState({[event.target.name]: event.target.value});
    }
    else{
      this.props.setError('You reached maximum input capacity.');
    }
  }

  publish = () => {
    this.setState({publishing:true});
    if(this.validate()){
      // save to server
      fetch('/api/post_blog',{
      method:"POST",
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "title":this.state.title,
          "featured_image":this.state.image,
          "content":[
                {text:this.state.content,index:0,type:'h'}
            ]
        })
      })
      .then(res => res.json())
      .then(result => 
        (result.success)
        ?(
          (result.blog_created)
          ?(
              this.props.history.push('/blog/'+result.blog_id)
          )
          :(
            this.setState({publishing:false}),
            this.props.setError(result.err)
          )
        )
        :(
          this.setState({publishing:false}),
          this.props.setError('Some Unknown Problem')
        )
      )
      .catch(err => {
        this.setState({publishing:false})
        return this.props.setError('Some Server Problem')
      });
    }
    else{
      this.setState({publishing:false})
    }
  }

  handleKeys = (event) => {
    if(event.key==='Enter' && event.ctrlKey){   
      this.handleClickOpen(event);
    }
  }

  render() {
  const {classes} = this.props;  
  return (
  (this.state.loaded)
  ?(
    <div className={classes.fixheight} onKeyPress={this.handleKeys}>
      <div className={classes.root}>
        <Grid container direction='row' justify='space-between' alignItems='center'>
          <Grid item>
          <Typography variant='h5'>
            Add a Blog
          </Typography>
          </Grid>

          <Grid item>
          <Fab
            variant='extended'
            size='medium'
            color='primary'
            aria-label='Add'
            onClick={this.handleClickOpen}
            className={classes.margin}>
            <NavigationIcon className={classes.extendedIcon}/>
            Preview
          </Fab>

          <Fab
            variant='extended'
            size='medium'
            color='primary'
            aria-label='Add'
             onClick={this.publish}
            className={classes.margin}
            disabled={this.state.publishing}>
            <NavigationIcon className={classes.extendedIcon}/>
            Publish
          </Fab>
          </Grid>
        </Grid>
        
        <TextField
            label='Title'
            name='title'
            className={classes.ll}
            margin='normal'
            value={this.state.title}
            onChange={(event)=> this.handleChange(event)}/>
        <TextField
            name='image'
            label='Link - Featured Image'
            className={classes.ll}
            margin='normal'
            value={this.state.image}
            onChange={(event)=> this.handleChange(event)}/>
        <TextField
            name= 'content'
            label='Markdown for Blog'
            multiline
            className={classes.markdown}
            margin='normal'
            value={this.state.content}
            onChange={(event)=> this.handleChange(event)}/>
      </div>
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' onClick={this.handleClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              Preview
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <BlogView
            title={this.state.title}
            image={this.state.image}
            autherImage={this.state.auther_thumbnail}
            auther={this.state.auther_username}
            content={[
              {text:this.state.content,index:0,type:'h'}
            ]}/>
          </div>
      </Dialog>
    </div>
    )
    :(<div>Loading...</div>)
  );}
}

AddBlog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBlog);