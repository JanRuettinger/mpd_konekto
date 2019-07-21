import { createMuiTheme } from '@material-ui/core/styles';
import { green, grey, red } from '@material-ui/core/colors';

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: 'white'
    },
    secondary: {
      light: '#757de8', //'#fff5f8',
      main: '#3f51b5', //'#ff3366',
      dark: '#002984', //'#e62958'
      contrastText: 'white'
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e'
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700]
    },
    success: {
      xLight: green[50],
      dark: green[700]
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif", //"'Roboto Mono', monospace", //,
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700 // Roboto Condensed
    //fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: 'uppercase'
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      // default: '#E45050',
      placeholder: grey[200]
    }
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightMedium
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 20
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16
    },
    body2: {
      ...rawTheme.typography.body1,
      fontWeight: 900,
      fontSize: 16
    }
  },
  overrides: {
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: rawTheme.palette.primary.main,
          color: 'white'
        }
      }
    }
    // MuiButton: {
    //   // Name of the styleSheet
    //   // root: {
    //   //   // Name of the rule
    //   //   // width: '80%',
    //   //   // 'text-align': 'center',
    //   //   // 'border-radius': '5px',
    //   //   // 'margin-top': '10px',
    //   //   // alignItems: 'center'
    //   // }
    // }
  }
};

export default theme;
