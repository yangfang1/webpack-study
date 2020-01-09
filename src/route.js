// routes/indexedDB.js
// 在路由的配置文件中引入所有的依赖
import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Home from './Home/Home';
import Test from './Test'
// 使用react-router提供的组件来定义应用的路由：
class RootComponent extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/test" component={Test}/>
      </Switch>
    )
  }
}

export default RootComponent;