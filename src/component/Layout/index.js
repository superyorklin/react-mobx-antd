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
            <li onClick={this.handleClick(0)} className={curr === 0 ? 'active' : ''} title='首页'>
              <Link to='/'><i className='iconfont icon-home'></i><span>首页</span></Link>
            </li>
            <li onClick={this.handleClick(1)} className={curr === 1 ? 'active' : ''} title='归档'>
              <Link to='/archive'><i className='iconfont icon-artical'></i><span>归档</span></Link>
            </li>
            <li onClick={this.handleClick(2)} className={curr === 2 ? 'active' : ''} title='推荐'>
              <Link to='/recommend'><i className='iconfont icon-recommend'></i><span>推荐</span></Link>
            </li>
            <li onClick={this.handleClick(3)} className={curr === 3 ? 'active' : ''} title='关于'>
              <Link to='/about'><i className='iconfont icon-about'></i><span>关于</span></Link>
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