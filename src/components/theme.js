import { createMuiTheme } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';
import * as Colors from '@material-ui/styles/colors';

export default createMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.white,
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.redA200
  }
});
