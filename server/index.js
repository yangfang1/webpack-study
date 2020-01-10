require('@babel/register');
const express=require('express');
const webpack=require('webpack');
const path=require('path')
const webpackConfig=require('../tools/webpack.config');
const webpackDevMiddleware=require("webpack-dev-middleware");
const complier=webpack(webpackConfig);
const render=require('./render')
const app=express();
app.disable('etag'); //防止返回状态总是304
app.use(webpackDevMiddleware(complier,{
  publicPath:webpackConfig.output.publicPath,
  noInfo:true,
  watchOptions:{
    aggregateTimeout:300,
    poll:true,
  },
  serverSideRender:true
}));
app.use(express.static(webpackConfig.output.publicPath));//设置项目静态资源的目录
app.get("*", (req, res, next) =>{
  const filename = path.join(path.join(__dirname, "../dist"), 'index.html');
  complier.outputFileSystem.readFile(filename, (err, result) =>{
    //此时是从内存中读取的文件，此种渲染方式只能在dev环境中用，因为webpack-dev-middleware只在dev环境中使用
      if(err){
          return(next(err))
      }
      res.set('content-type', 'text/html')
      render(result,req,res);
      res.end()
  })
})
app.listen(8000,()=>{
  console.log("App is on port 8000:http://localhost:8000")
})