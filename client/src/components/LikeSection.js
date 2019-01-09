import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  tt:{
    margin: theme.spacing.unit*2,
  },
  button: {
    borderRadius: 35,
    padding: '20px 8px',
    fontSize: '18px',
    margin: theme.spacing.unit*4,
  },
  about:{
    margin: theme.spacing.unit*4,
  },
});


class LikeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      liked: this.props.liked
    };
  }

  like = (id) => {
    if(this.state.liked){
      this.props.setError('You have already liked this blog.')
    }
    else{
      fetch('/api/like_blog',{
          method:"POST",
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({blog_id:id})
        })
        .then(res => res.json())
        .then(result => 
          (result.success)
          ?(
            (result.liked_blog)
            ?(
                this.setState(prevState => ({
                  likes: prevState.likes+1,
                  liked: true
                }))
            )
            :(
                this.props.setError(result.error)
            )
          )
          :(
            this.props.setError('Some Unknown Problem')
          )
        )
        .catch(err =>  this.props.setError('Some Server Problem'));
    }
  }

  render(){  
  const { classes } = this.props;
  return (
    <div align='center'>
      <Grid container direction='row'>
        <Grid item xs={12} md={6}>
          <Button className={classes.button}
            variant='contained'
            color = 'primary'
            onClick={() => this.like(this.props.blog_id)}>
            <img alt='Like' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfAAAAXwBsrqMZwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEcSURBVEiJ7ZS9SkMxGIbfiItrpd06VDp2Eldx8GfXexBvQbwIvQYrCN6A3oTegA4VtWAVunQ5Ivi45MBXycnJsRn7QiCQfM/DF5JIyzQN0AEugFdgCrwDl0Df7OkDQ7829XvPgXYdfAv4JJwv4Bg48fNQJsBmFbwNfFQUlvnxI5YJsF5yV4zjTFK8Rcn5EUtH0qktKDt4kdStKU7NyDm38VfwLWk1k6Bwzq1J80c0zgSfY1nBXUbBbUgwlEQGOJKuwitwU3MFU3JdrYYW8LwAfAS04v3BDtUvNZYC2E47RDjwBU3g+0lwIzlKlBTAYSO4kewBswh8Buz+C24kA2AcgL8Bg4XgRtIDngz8EehlgRtJF3gA7oFcn+Iy0i91hW3BDlRzZQAAAABJRU5ErkJggg=='/>
          </Button>
          {this.state.likes}
        </Grid>
        <Grid item container xs={12} md={6} direction='column' justify='center'>  
          <div className={classes.about}>
            <Grid item>
              Written By:   
            </Grid>
            <Grid item>
              <Chip className={classes.tt}
              avatar={<Avatar src={this.props.autherImage}/>}
              label={this.props.auther}
              color= 'primary'/>
            </Grid>
          </div>
        </Grid>
      </Grid>
        </div>              
  );
  }
}

LikeSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LikeSection);