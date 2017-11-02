import React from 'react';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import {Form,Input,Button,message,Icon} from 'antd';
import TimeFormat from '../../utils/timeFormat';
import API from '../../interface/api';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

@observer
export default class Comment extends React.Component{

  @observable comment = [];
  @action changeComment = (data) => {
    this.comment = data
  }

  constructor(props){
    super(props);
  }

  _getData = () => {
    Interface.getComment({articalId: this.props.articalId}).then(res => {
      this.changeComment(res);
    }).catch(() => {
      message.error('获取评论失败');
    })
  }

  componentWillMount(){
    this._getData();
  }
  
  render(){
    let list = [];
    if(this.comment.length === 0){
      list.push(<div className='comment-list'>评论区虚位以待</div>);
    }else{
      this.comment.map((item,index) => {
        list.push(
          <div className='comment-list' key={index}>
            <p style={{fontSize: 14}}><span>{ 1 + index}楼&nbsp;&nbsp;</span>{TimeFormat(item.time,'type2')}</p>
            <p style={{fontSize: 14,color: '#0C0'}}>{item.author}&nbsp;:</p>
            <p style={{fontSize: 14,marginTop: 5,fontFamily: 'Georgia, serif',wordWrap: 'break-word',background: 'white',padding: '5px'}}>{item.content}</p>
          </div>)
      })
    }
    return (
      <div className='comment-area' id='comment'>
        <p style={{fontSize: 30,borderTop: '3px solid #CCCCCC'}}>评论区</p>
        {list}
        <p style={{fontSize: 30,marginTop: 10}}>发表评论</p>
        <WrappedCommitForm reload={this._getData} articalId={this.props.articalId}/>
      </div>
    )
  }
}
@observer
class CommitForm extends React.Component{
  
  @observable captchaUrl = API.GET_CAPTCHA;
  @action changeCaptcha = () => {
    this.captchaUrl = API.GET_CAPTCHA + '?_=' + new Date().getTime();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,value) => {
      if(!err){
        value.author = encodeURIComponent(value.author);
        value.content = encodeURIComponent(value.content);
        value.code = encodeURIComponent(value.code);
        value.articalId = this.props.articalId; 
        Interface.postComment(value).then(res => {
          if(res.Success){
            message.success('评论成功');
            this.props.form.resetFields();
            this.props.reload();
          }
        }).catch((err) => {
          err.errMsg && message.error(err.errMsg);
          !err.errMsg && message.error('提交评论失败');
          this.props.form.resetFields(['code'])
          this.changeCaptcha(); 
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 11
      }
    };
    return (
      <Form onSubmit={this.handleSubmit} style={{maxWidth: 500,margin: 'auto'}}>
        <FormItem {...formItemLayout} label='姓名'>
          {getFieldDecorator('author',{
            rules: [
              {
                required: true,
                message: '姓名不得为空'
              }
            ]
          })(
            <Input placeholder='请输入姓名' autoComplete='off'/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='评论'>
          {getFieldDecorator('content',{
            rules: [
              {
                required: true,
                message: '评论内容不得为空'
              }
            ]
          })(
            <TextArea placeholder='请开始你的表演' autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='验证码'>
          {getFieldDecorator('code',{
            rules: [
              {
                required: true,
                message: '请输入验证码'
              }
            ]
          })(
            <Input className='captcha' placeholder='请输入验证码' autoComplete='off' /> 
          )}
          <Icon className='captcha-refresh' onClick={this.changeCaptcha} type="sync" />
          <img className='captcha-pic' onClick={this.changeCaptcha} src={this.captchaUrl} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' size='large'>提交评论</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedCommitForm = Form.create()(CommitForm);

