import React  from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import configureStore from './redux'
import RootComponent from './route';
const intialState=window.__INITIAL_STATE__
const store=configureStore(intialState);
ReactDOM.hydrate(//服务端渲染就需要用hydrate来判断什么时候需要客户端渲染
  <Provider store={store}>
    <BrowserRouter>
      <RootComponent/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)