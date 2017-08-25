import React from 'react';
import './layout.less';
import { Link } from 'react-router';

export default class Home extends React.Component {
 
  componentWillMount(){
    if(!localStorage.getItem('curr')){
      localStorage.setItem('curr',0);
    }
  }
  handleClick = (index) => () =>{
    localStorage.setItem('curr',index);
  }
  render(){
    const curr = +localStorage.getItem('curr');
    return (
      <div className='container'>
        <div className='side-menu'>
          <div className='img'></div>
          <ul>
            <li onClick={this.handleClick(0)} className={curr === 0 ? 'active' : ''}>
              <Link to='/'><i className='iconfont icon-home'></i>首页</Link>
            </li>
            <li onClick={this.handleClick(1)} className={curr === 1 ? 'active' : ''}>
              <Link to='/archive'><i className='iconfont icon-artical'></i>归档</Link>
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