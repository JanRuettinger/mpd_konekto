import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export default withStyles(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
    // height: '60%',
    // border: 'black',
    // 'border-width': 'medium',
    // 'margin-top': '50px',
    // background: 'rgba(255, 255, 255, 0.8)',
    // 'border-radius': '20px'
  }
}))(Grid);
