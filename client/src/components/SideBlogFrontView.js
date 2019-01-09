import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

function SideBlogFrontView(props) {
  const { classes } = props;
  const BlogClicked = () => {
    //console.log(props.to)
  };
  return (
    <div className={classes.root} onClick={BlogClicked}>
      <div className={classes.paper}>
        <Grid container spacing={16}>
          
          <Grid item sm container>
           <Grid item xs={12} >
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt='featured' src={props.thumbnail} />
            </ButtonBase>
          </Grid>
          
            <Grid item sm container>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {
                    (props.title.length>110)
                    ?(props.title.slice(0,110)+' ...')
                    :(props.title)
                  }
                </Typography>
                <Typography gutterBottom variant='subtitle2'>{props.auther}</Typography>
              </Grid>
            </Grid>
          </Grid>
        
        </Grid>
      </div>
    </div>
  );
}

SideBlogFrontView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBlogFrontView);

