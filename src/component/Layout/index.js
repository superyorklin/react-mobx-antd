import React from 'react';
import './layout.less';
import { Link } from 'react-router';

export default class Home extends React.Component {
  state={
    curr: 0
  }
  componentWillMount(){
    switch (this.props.location.pathname){
      case '/about':
        this.setState({curr: 3});
        break;
      case '/artical':
        this.setState({curr: 1});
        break;
      case '/recommend':
        this.setState({curr: 2});
        break;
      default:
        this.setState({curr: 0})
    }
  }
  handleClick = (index) => () =>{
    this.setState({
      curr: index
    })
  }
  render(){
    const {curr} = this.state;
    return (
      <div className='container'>
        <div className='side-menu'>
          <div className='img'></div>
          <ul>
            <li onClick={this.handleClick(0)} className={curr === 0 ? 'active' : ''}>
              <Link to='/'><i className='iconfont icon-home'></i>首页</Link>
            </li>
            <li onClick={this.handleClick(1)} className={curr === 1 ? 'active' : ''}>
              <Link to='/'><i className='iconfont icon-artical'></i>随笔</Link>
            </li>
            <li onClick={this.handleClick(2)} className={curr === 2 ? 'active' : ''}>
              <Link to='/'><i className='iconfont icon-recommend'></i>推荐</Link>
            </li>
            <li onClick={this.handleClick(3)} className={curr === 3 ? 'active' : ''}>
              <Link to='/about'><i className='iconfont icon-about'></i>关于</Link>
            </li>
          </ul>
        </div>
        <div className='main-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}