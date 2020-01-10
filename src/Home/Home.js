import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {test} from '../redux/modules/home';
// import './home.scss'
class Home extends Component{
  componentDidMount(){
    this.props.test()
  }
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
const mapStateToProps = state => ({
  test: state.home.test,
});
const mapDispatchToProps = dispatch => ({
  test:bindActionCreators(test,dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)