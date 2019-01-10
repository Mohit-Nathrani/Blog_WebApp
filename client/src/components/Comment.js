import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag:false,
      my_comment: '',
      reply: this.props.comment.reply,
      submitting: false
    };
  }

  show = () => {
  	this.setState({flag:true});
  }

  hide = () => {
  	this.setState({flag:false});
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
    if(!(this.props.isAuth)){
      this.props.setError('Login is required to post comments.');
      this.setState({submitting:false});
    }
    else if(this.state.my_comment.length===0){
      this.props.setError('Empty comments not allowed.');
      this.setState({submitting:false});
    }
    else{
      fetch('/api/post_comment_reply',{
        method:"POST",
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          comment_id:this.props.comment._id,
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
                reply: [
                        {_id:result.comment_id,
                          text:this.state.my_comment,
                          auther_name:'You',
                          reply:[],
                          level: this.props.comment.level+1
                        }].concat(prevState.reply),
                my_comment: '',
                flag:false,
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
        this.setState({submitting:false})
        return this.props.setError('Some Server Problem')
      });
    }
  }

  render() {
    return(
      <div>
        <Divider style={{marginTop: '10px'}}/>
        <div style={{borderLeft: "1px solid #222"}}>
    	    <div style={{marginLeft: "10px" }}> 
            {this.props.comment.auther_name} : {this.props.comment.text}
          </div>
          <div style={{marginLeft: "10px" }}> 
          {
            (this.props.comment.level<=3)
            ?(
              <div>  	
                {(!this.state.flag)
        	      ?(<Button variant="contained" color="primary" onClick={this.show}>
        	            reply
        	        </Button>
        	       )
        	      :(<Button variant="contained" color="primary" onClick={this.hide}>
        	            cancel
        	        </Button>)
            	  }
                {(this.state.flag)
            	  ?(
                <div>
                  <Grid container>   
                    <Grid item container>
                      <TextField
                        id="outlined-textarea"
                        placeholder="Comment"
                        multiline
                        margin="normal"
                        variant="outlined"
                        name="my_comment"
                        value={this.state.my_comment}
                        onChange={this.handleChange}/>
                    </Grid>
                    <Grid item container>
                      <Button variant="contained" color="primary" onClick={this.handleSubmit}  disabled={this.state.submitting}>
                        Submit Comment
                      </Button>
                    </Grid>
                  </Grid>
                </div>
                )
                :(<div></div>)}
              </div>
            )
            :(<div></div>)
          }
          </div>
        </div>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs>
              { this.state.reply.length > 0 && this.state.reply.map((child) => {
                return(<Comment key={child._id} comment={child} setError={this.props.setError} isAuth={this.props.isAuth}/>)
              })}
            </Grid>
          </Grid>
        </div>
      </div>
  )
  }
}

export default Comment;