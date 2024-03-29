import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
 <Provider store={store}>
  
  <App/>
 </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
