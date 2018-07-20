import React                    from 'react';
import ReactDOM                 from 'react-dom';
import App                      from './App';
import registerServiceWorker    from './registerServiceWorker';


import './include/bootstrap';
import './index.css';
import 'status-indicator/styles.css'


ReactDOM.render(
    <App />, 
  document.getElementById('root'));

registerServiceWorker();