import React  from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import RootComponent from './route'
ReactDOM.hydrate(//服务端渲染就需要用hydrate来判断什么时候需要客户端渲染
  <BrowserRouter>
    <RootComponent/>
  </BrowserRouter>,
  document.getElementById('root')
)