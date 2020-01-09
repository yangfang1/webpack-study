import React,{Component} from 'react';
import {Link} from 'react-router-dom'
// import './home.scss'
class Home extends Component{
  render(){
    const string=' webpack'
    return(
      <div className="home-root">
        <p>{`hello${string}`}</p>
        <Link to='/test'>点击跳转</Link>
      </div>
    )
  }
}
export default Home