import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto'
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

function ComplexGrid(props) {
  const { classes } = props;
  const BlogClicked = () => {
    //console.log(props.to)
  };
  return (
    <div className={classes.root} onClick={BlogClicked}>
      <div className={classes.paper}>
        <Grid container spacing={16}>
          

          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt='featured' src='https://image.freepik.com/free-vector/pack-of-colorful-square-emoticons_23-2147589525.jpg' />
            </ButtonBase>
          </Grid>
          
          <Grid item sm>
            <Grid item sm container direction='column' spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {
                    (props.title.length>120)
                    ?(props.title.slice(0,120)+' ...')
                    :(props.title)
                  }
                </Typography> 
                <Typography gutterBottom color='textSecondary'>
                  {
                    (props.content.length>160)
                    ?(props.content.slice(0,160)+' ...')
                    :(props.content)
                  }
                </Typography>
                <Typography gutterBottom variant='subtitle2'>{props.auther}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider/>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);

