const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
module.exports={
  mode:"development",//模式，development和production，主要是压缩与不压缩的区别
  entry:{
    app:path.join(__dirname,'../src/index.js'),
  },//可以只是一个字符串，这样就没有chunkname
  output:{
    path:path.join(__dirname,"../dist"),//需要的是一个绝对路径，resolve会把相对路径转换为绝对路径，__dirname表示当前目录下
    filename:"bundle.[name].[hash:8].js",//也可以为相对路径，还可以是[name].bundle.js,[name]则是chunkname
    publicPath:"/public/"
  },
  optimization:{
    splitChunks:{
      chunks:"all"
    }
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use:["babel-loader"]
      },
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,"css-loader"]
      },
      {
        test:/\.scss$/,
        use:[MiniCssExtractPlugin.loader,"css-loader","sass-loader"]//单独抽离样式文件
        // use:["style-loader","css-loader","sass-loader"]//也需要css-loader,需要把sass转换成css
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({//dev和prod都会用到的
      template:path.join(__dirname,'../src/index.html'),//路径直接是根路径(所以即使把config.js放在文件夹内，还是这么写)
      // filename:path.resolve(__dirname, "../dist/index.html")//如果写路径，则是相对于output的路径来写的
      filename:'index.html'
    }),
    new MiniCssExtractPlugin({
      filename:"css/bundle.[name].[hash:8].css"
    }),
    new CleanWebpackPlugin()
  ],
  devServer:{//只有dev才会用到
    //测试环境使用dev打包后是不会产生能看见的文件的，因为它是写在内存中，并没有写在磁盘中，
    //通过build才会产生在磁盘中的文件
    port:3000,
    progress:true,
    // open:true,//是否直接打开网页
    contentBase: path.join(__dirname, "../dist"),//放在前面,在设置了publicPath之后设置或者不设置都可以
    publicPath:"/public/",
    historyApiFallback: {
      index: '/public/index.html'
    },
  },
}