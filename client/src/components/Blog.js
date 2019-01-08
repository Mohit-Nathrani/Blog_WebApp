import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import LikeSection from './LikeSection'
import BlogView from './BlogView'


const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'8%',
    paddingRight:'8%'
  },
  image: {
    width: 256,
    height: 256,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  bigAvatar: {
    marginTop: 10,
    width: 60,
    height: 60,
  },
  tt:{
    margin: theme.spacing.unit*2,
  },
  padd:{
    padding: theme.spacing.unit*5,
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
  spacing:{
    padding: 20,
    paddingLeft:'5%',
    paddingRight:'5%',
  },
});


function Blog(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.root}>
        <BlogView
          image={props.image}
          title={props.title}
          autherImage={props.autherImage}
          auther={props.auther}
          content={props.content}/>
        <Divider className={classes.tt}/>
        
        <LikeSection
          likes={props.likes}
          auther={props.auther}
          autherImage={props.autherImage}/>  
        
        <Typography className={classes.tt} variant='h6' color='inherit' noWrap>
          Comments
        </Typography>
        <Divider/>
            

      </div>
    </div>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);