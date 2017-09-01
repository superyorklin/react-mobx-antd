import React from 'react';
import './about.less';

export default class About extends React.Component{
  render(){
    return (
      <div className='about-me' style={{margin: '0 auto',maxWidth: 1080}}>
        <h1>About Me</h1>
        <p>我是York Lin，现居于杭州</p>
        <p>日常所见所闻，所感记录于此</p>
        <p><i style={{marginRight: 10}} className='iconfont icon-mail'></i>个人邮箱：youk_lin@yeah.net</p>
        <p><i style={{marginRight: 10}} className='iconfont icon-git'></i>Github：<a href="https://github.com/superyorklin"><i style={{textDecoration: 'underline'}}>https://github.com/superyorklin</i></a></p>
      </div>
    )
  }
}