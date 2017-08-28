import React from 'react';
import {Pagination,Icon,Spin,message} from 'antd';
import './home.less';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import {Link} from 'react-router';

@observer
export default class Home extends React.Component {

  @observable total = 0;
  @observable artical = [];
  @observable loading = false;
  @action changeLoading = () => {
    this.loading = !this.loading;
  }
  @action changeArtical = (val) => {
    this.artical = val;
  }
  @action changeTotal = (val) => {
    this.total = val;
  }

  componentWillMount(){
    this._getData(1);
  }
  _getData = (page) => {
    this.changeLoading();
    Interface.getAllArtical({page: page}).then(res => {
      this.changeLoading();
      this.changeArtical(res.data);
      this.changeTotal(res.total);   
    }).catch(err => {
      let msg = `${err.statusCode}错误`;
      this.changeLoading();
      message.error(msg);
    });
  }
  pageChange = (page) => {
    this._getData(page)
  }
  render(){
    let list = [];
    this.artical.forEach(function(item,index){
      list.push(<Item key={index} item={item} />)
    })
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <Spin tip='Loading...' spinning={this.loading} />
        </div>
        <div className='home-main'>
          <ul>
            {list}
          </ul>
        </div>
        <footer className='pagination'>
          <Pagination showTotal={total => `总共${total}篇文章`} total={this.total} onChange={this.pageChange}/>
        </footer>
      </div>
    )
  }
}

const Item = observer((props) => {
  const {id,title,time,desc,tag,visit} = props.item;
  let tagList = [];
  if(tag){
    tag.map(function(item,index){
      tagList.push(<span className="artical-item-tag" key={index}><Icon type="tag" />{item}</span>)
    })
  }
  return(
    <li className='artical-item'>
      <header>
        <span className='artical-item-title'><Link to={`/artical/${id}`}>{title}</Link></span>
        <span className='artical-item-time'><Icon type="calendar" />{time}</span>
      </header>
      <desc dangerouslySetInnerHTML={{__html: desc}}></desc>
      <footer className="clearfix">
        <span className='artical-item-visit'><Icon type="eye" />{visit}</span>
        {tagList}
      </footer>
    </li>
  )
})