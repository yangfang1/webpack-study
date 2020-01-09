const express=require('express');
const webpack=require('webpack');
const path=require('path')
const webpackConfig=require('../tools/webpack.config');
const webpackDevMiddleware=require("webpack-dev-middleware");
const complier=webpack(webpackConfig);
const app=express();
app.use(webpackDevMiddleware(complier,{
  publicPath:webpackConfig.output.publicPath,
  noInfo:true,
  watchOptions:{
    aggregateTimeout:300,
    poll:true,
  },
  // serverSideRender:true
}));
// app.use(express.static(path.join(__dirname,'../dist')));
app.get("*", (req, res, next) =>{
  const filename = path.join(path.join(__dirname, "../dist"), 'index.html');

  complier.outputFileSystem.readFile(filename, (err, result) =>{
      if(err){
          return(next(err))
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
  })
})
app.listen(8080,()=>{
  console.log("App is on port 8080:http://localhost:8080")
})