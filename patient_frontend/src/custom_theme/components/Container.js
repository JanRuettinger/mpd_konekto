import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default withStyles(theme => ({
  root: {
    alignItems: 'center',
    marginTop: '30px',
    width: '80%'
  }
}))(Container);
