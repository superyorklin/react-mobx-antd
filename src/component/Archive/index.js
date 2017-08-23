import React from 'react';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action,autorun} from 'mobx';
import {Link} from 'react-router';
import {Icon} from 'antd';
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
    <div>
      <h2 style={{textAlign: 'center',marginBottom: 10}}>{props.data.type}</h2>
      {list}
    </div>
  )
}

const Listitem = (props) => {
  return (
    <Link to=''>
      <div className='archive-item'>
        {props.data.title}
        <span className='archive-item-time'><Icon type="calendar" />{props.data.time}</span>
      </div>
    </Link>
  )
}