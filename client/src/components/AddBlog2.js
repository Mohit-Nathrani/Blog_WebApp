import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';

import BlogView from './BlogView'


const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'10%',
    paddingRight:'10%'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});


function Transition(props) {
  return <Slide direction='up' {...props} />;
}

const size_map = {title:180, image:400, paragraph:2000, max_paragraphs:30};

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      image:'',
      content:[],
      open:false,
      loaded:false,
      auther:'',
      thumbnail: '',
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
              auther: result.user.username,
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

  validate(){
    if(this.state.title === ''){
      this.props.setError('Title is empty.');
      return false;
    }
    else if(this.state.image === ''){
      this.props.setError('Featured image is required.' );
      return false;
    }
    else if(this.state.content.length === 0 || this.state.content[0].text === '' ){
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

  handleContentChange = (event,index) => {
    event.persist()
    if(event.target.value.length <= size_map['paragraph']){
      this.setState(state => {
        const content = state.content.map(para => {
          if (para.index === index) {
            return {text: event.target.value,index:para.index,type:para.type};
          } 
          else {
            return para;
          }
        });

        return {
          content,
        };
      });
    }
    else{
      this.props.setError('You reached maximum paragraph block capacity.');
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
          "content": this.state.content
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
  }

  
  add = (choice) => {
    if(this.state.content.length<=size_map['max_paragraphs']-1){
      this.setState(prevState => ({
        content: [...prevState.content, {text:'',index:prevState.content.length,type:choice}]
      }));
    }
    else{
      this.props.setError('Maximum number of blocks reached.');
    }
  }



  render() {
  const {classes} = this.props;  
  return (
  (this.state.loaded)
  ?(
    <div>
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
            <NavigationIcon className={classes.extendedIcon} />
            Publish
          </Fab>
          </Grid>
        </Grid>
        <Grid container direction='column' spacing={16} >
          
          <Grid item>
            <TextField
              id='standard-with-placeholder'
              label='Title'
              className={classes.textField}
              margin='normal'
              onChange={(event)=> this.handleChange(event)}
              name='title'
              value={this.state.title}/>
            <TextField
              id='standard-with-placeholder'
              label='Link of Featured Image'
              className={classes.textField}
              margin='normal'
              onChange={(event)=> this.handleChange(event)}
              name='image'
              value={this.state.image}/>
          </Grid>
            {this.state.content.map(para =>
              (para.type==='p')
              ?(
              <Grid item key={para.index}>
                <TextField
                  label={'Paragraph'}
                  multiline
                  className={classes.textField}
                  margin='normal'
                  value={para.text}
                  onChange={(e) => this.handleContentChange(e,para.index)}/> 
              </Grid>
              )
              :(
              <Grid item key={para.index}>
                <TextField
                  label={'Image Link'}
                  className={classes.textField}
                  margin='normal'
                  value={para.text}
                  onChange={(e) => this.handleContentChange(e,para.index)}/>
              </Grid>
              )
            )}
          <Grid item container justify='center'>
            <Tooltip title='Add Paragraph' aria-label='Add Paragraph'>
              <Fab color='primary'
                className={classes.fab} 
                onClick={() => this.add('p')}
                style={{margin:15}}>
                <AddIcon/>
              </Fab>
            </Tooltip>

            <Tooltip title='Add Image' aria-label='Add Image'>
              <Fab color='default'
                className={classes.fab} 
                onClick={()=>this.add('i')}
                style={{margin:15}}>
                <AddIcon/>
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
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
              autherImage={this.state.thumbnail}
              auther={this.state.auther}
              content={this.state.content}/>
          </div>
        </Dialog>
      </div>
    </div>
    )
    :(<div>Loading...</div>)
  );
  }
}

AddBlog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBlog);