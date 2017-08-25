import React from 'react';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import {Form,Input,Button} from 'antd';
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
  componentWillMount(){
    Interface.getComment({articalId: this.props.articalId}).then(res => {
      this.changeComment(res);
    })
  }
  render(){
    let list = [];
    if(this.comment.length === 0){
      list.push(<div className='comment-list'>评论区虚位以待</div>);
    }else{
      this.comment.map((item,index) => {
        list.push(
          <div className='comment-list' key={index}>
            <p style={{fontSize: 14}}>{item.name}</p>
            <p style={{fontSize: 12,color: '#0C0'}}>{item.time}</p>
            <p style={{fontSize: 14,marginTop: 10,fontFamily: 'Georgia, serif',wordWrap: 'break-word'}}>{item.content}</p>
          </div>)
      })
    }
    return (
      <div className='comment-area'>
        <p style={{fontSize: 30,borderTop: '3px solid #CCCCCC'}}>评论区</p>
        {list}
        <p style={{fontSize: 30,marginTop: 10}}>发表评论</p>
        <WrappedCommitForm />
      </div>
    )
  }
}

class CommitForm extends React.Component{
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,value) => {
      if(!err){
        console.log(value);
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label='姓名'>
          {getFieldDecorator('name',{
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
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' size='large'>提交评论</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedCommitForm = Form.create()(CommitForm);

