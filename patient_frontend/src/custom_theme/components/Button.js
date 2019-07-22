import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default withStyles(theme => ({
  root: {
    TextAlign: 'center',
    marginTop: '30px',
    // height: '80%',
    width: '100%',
    borderRadius: '10px',
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    padding: theme.spacing(2, 4),
    boxShadow: 'none',
    '&:active, &:focus': {
      boxShadow: 'none'
    }
  },
  sizeSmall: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(16)
  },
  sizeLarge: {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(20)
  },
  textPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  textSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}))(Button);
