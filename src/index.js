import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from './App';
import registerServiceWorker    from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import './include/bootstrap';
import './index.css';
import 'status-indicator/styles.css';

const styles = {
  "white":              "#EAEAEA",
  "lightBlue":          "#00A8E8",
  "lightBlueAlt":       "#00E8FF",
  "midBlue":            "#007EA7",
  "darkBlue":           "#687887",
  "bgBlue":             "#43575D",
  "bg":                 "#181A1C",
  "bgAlt":              "#1D1F21",
}

const theme = createMuiTheme({
  palette: {
    primary: { main: styles.midBlue },
    secondary: { main: styles.darkBlue }, 
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('root'));

registerServiceWorker();