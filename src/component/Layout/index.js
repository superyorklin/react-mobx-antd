import React from 'react';
import './layout.less';
import { Link,IndexLink } from 'react-router';

export default class Home extends React.Component {
 
  render(){
    return (
      <div className='container'>
        <div className='side-menu'>
          <div className='img'></div>
          <ul>
            <li title='首页'>
              <IndexLink to='/' activeClassName="active" ><i className='iconfont icon-home'></i><span>首页</span></IndexLink>
            </li>
            <li title='归档'>
              <Link to='/archive' activeClassName="active"><i className='iconfont icon-artical'></i><span>归档</span></Link>
            </li>
            <li title='推荐'>
              <Link to='/recommend' activeClassName="active"><i className='iconfont icon-recommend'></i><span>推荐</span></Link>
            </li>
            <li title='关于'>
              <Link to='/about' activeClassName="active"><i className='iconfont icon-about'></i><span>关于</span></Link>
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