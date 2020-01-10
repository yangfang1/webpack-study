import React from 'react' //还是需要引入react
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../src/redux'
const store=configureStore();
const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
import RootComponent from '../src/route' ;//不是直接引入客户端的index
module.exports=(result,req,res)=>{
  let template=result.toString()
  const html=renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        {/* location={req.path}非常重要，否则服务端路由就始终都是静态的，不能跳转 */}
        <RootComponent/>
      </StaticRouter>
    </Provider>
    
  );//用renderToString渲染页面的时候不能直接传入RootComponent,而是要传入RootComponent组件
  template=template.replace("<!--app -->",html);
  template=template.replace("<!-- intailState -->",`
  <script>
    window.__INITIAL_STATE__ = ${preloadedState}
  </script>
  `);
  res.send(template)
}