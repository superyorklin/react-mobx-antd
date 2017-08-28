import React from 'react';
import './artical.less';
import {Spin,message} from 'antd';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import Comment from './Comment';

@observer
export default class Artical extends React.Component{
  @observable loading = false;
  @action changeLoading = () => {
    this.loading = !this.loading;
  }
  state = {
    content: ''
  }
  componentWillMount(){
    this.changeLoading();
    fetch(`/artical/${this.props.routeParams.id}`).then(res => res.text()).then(res => {
      this.setState({
        content: res
      },() => {
        this.changeLoading();
      })
    }).catch(err => {
      let msg = `${err.statusCode}错误`;
      this.changeLoading();
      message.error(msg);     
    })
  }
  render(){
    return (
      <div className='artical-content' style={{background: 'white',borderRadius: 5}}>
        <div style={{textAlign: 'center'}}>
          <Spin tip='Loading...' spinning={this.loading} />
        </div>
        <div dangerouslySetInnerHTML={{__html: this.state.content}}>
        </div>
        <Comment articalId={this.props.routeParams.id}/>
      </div>
    )
  }
}