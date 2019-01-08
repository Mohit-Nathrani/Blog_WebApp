import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
   root: {
    flexGrow: 1,
    padding: 20,
    paddingLeft:'10%',
    paddingRight:'10%'
  }
});


function NotFound(props){
    return (
      <div>
        <div>
        	<Grid container sm={12} spacing={24}> 	
            	<Grid item container direction='row' justify='center' spacing={16} >
              	<Typography variant='subtitle1'>
                		Error 404: No Such Page Found
              	</Typography>
          	  </Grid>
	        </Grid>
        </div>
      </div>
    );
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
