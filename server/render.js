import React from 'react' //还是需要引入react
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import RootComponent from '../src/route' ;//不是直接引入客户端的index
module.exports=(result,req,res)=>{
  const template=result.toString()
  const html=renderToString(
    <StaticRouter context={{}} location={req.path}>
      {/* location={req.path}非常重要，否则服务端路由就始终都是静态的，不能跳转 */}
      <RootComponent/>
    </StaticRouter>
  );//用renderToString渲染页面的时候不能直接传入RootComponent,而是要传入RootComponent组件
  res.send(template.replace("<!--app -->",html))
}