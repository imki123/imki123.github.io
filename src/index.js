import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode basename={process.env.PUBLIC_URL}>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);