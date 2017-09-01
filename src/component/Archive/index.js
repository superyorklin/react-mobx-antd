import React from 'react';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import {Link} from 'react-router';
import {Icon,message} from 'antd';
import TimeFormat from '../../utils/timeFormat';
import './archive.less';

@observer
export default class Archive extends React.Component{

  @observable data = [];
  @action changeData = (newData) => {
    this.data = newData;
  }

  componentWillMount(){
    Interface.getArchive().then(res => {
      this.changeData(res);
    }).catch(err => {
      message.error(`${err.statusCode}错误`);
    })
  }

  render(){
    let typeItem = [];
    this.data.map(function(item,index){
      typeItem.push(<Typeitem data={item} key={index}/>);
    })
    return (
      <div>
        {typeItem}
      </div>
    )
  }
}

const Typeitem = (props) => {
  let list = [];
  props.data.data.map(function(item,index){
    list.push(<Listitem data={item} key={index} />)
  })
  return (
    <div style={{margin: '0 auto',maxWidth: 1080}}>
      <h2 style={{textAlign: 'center',marginBottom: 10}}>{props.data.type}</h2>
      {list}
    </div>
  )
}

const Listitem = (props) => {
  const {id,title,time,tag} = props.data;
  let tagList = [];
  if(tag.length !== 0){
    tag.map(function(item,index){
      tagList.push(<span key={index}><Icon type="tag" />{item}</span>)
    })
  }
  return (
    <Link to={`/artical/${id}`}>
      <div className='archive-item'>
        {title}
        <span className='archive-item-time'><Icon type="calendar" />{TimeFormat(time,'type1')}</span>
        <div className="archive-item-tag">
          {tagList}
        </div>
      </div>
    </Link>
  )
}