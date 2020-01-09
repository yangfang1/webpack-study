import React,{Component} from 'react';
import {Link} from 'react-router-dom';
// import './index.scss'
class Test extends Component{
  render(){
    return(
      <div className="new-root">
        <p>这个页面是新页面</p>
        <Link to='/'>回到首页</Link> 
      </div>
    )
  }
}
export default Test