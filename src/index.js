import React  from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import RootComponent from './route'
ReactDOM.render(
  <BrowserRouter>
    <RootComponent/>
  </BrowserRouter>,
  document.getElementById('root')
)