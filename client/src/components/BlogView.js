import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import marked from 'marked'


const rules = `<style>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width:80%;
}
</style>
` 

const styles = theme => ({
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
  space:{
    padding: 20,
    paddingLeft:'5%',
    paddingRight:'5%',
  },
});


function BlogView(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container space={16} justify='center'>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.img} alt='featured' src={props.image} />
          </ButtonBase>
        </Grid>  
        <Grid item sm>
          <div className={classes.padd}>
          <Grid container align='center'>
            <Grid item xs>
              <Typography variant='h5'>
                  {props.title}
              </Typography> 
              <Typography variant='caption' className={classes.tt}>
                  16 Dec 2018
              </Typography>   
              <Chip className={classes.tt}
                avatar={<Avatar src={props.autherImage}/>}
                label={props.auther}/>
            </Grid>
          </Grid>
          </div>
        </Grid>
      </Grid>
      
      <Divider className={classes.tt}/>
      <Grid container>
      {props.content.map(para =>
        (para.type==='p')
        ?(
          <Grid item key={para.index}>
            <Typography variant='h6' className={classes.tt}>
              {para.text}
            </Typography>
          </Grid>
        )
        :(
          (para.type==='i')
          ?(
            <Grid item key={para.index} className={classes.tt}>
              <img className={classes.img} alt='content' src={para.text} width='70%'/> 
            </Grid>
          )
          :(
            <Typography variant='subtitle1' className={classes.tt}>
              <div dangerouslySetInnerHTML = {{__html: marked(rules+para.text)}} className={classes.space}>
              </div>
            </Typography>
          )
        )
      )}
      </Grid>
    </div>
  );
}

BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);