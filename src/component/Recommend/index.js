import React from 'react';
import {Pagination,Icon,Spin,message} from 'antd';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';

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
    Interface.getRecommend({page: page}).then(res => {
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
      <div style={{margin: '0 auto',maxWidth: 1080}}>
        <div style={{textAlign: 'center'}}>
          <Spin tip='Loading...' spinning={this.loading} />
        </div>
        <div className='home-main'>
          <ul>
            {list}
          </ul>
        </div>
        <footer className='pagination'>
          <Pagination showTotal={total => `总共${total}篇推荐文章`} pageSize={5} total={this.total} onChange={this.pageChange}/>
        </footer>
      </div>
    )
  }
}

const Item = observer((props) => {
  const {title,desc,tag,author,url} = props.item;
  let tagList = [];
  if(tag){
    tag.map(function(item,index){
      tagList.push(<span className="artical-item-tag" key={index}><Icon type="tag" />{item}</span>)
    })
  }
  return(
    <li className='artical-item'>
      <header>
        <span className='artical-item-title'><a href={url}>{title}</a></span>
        <span className='artical-item-author' style={{float: 'right',fontSize: 16}}><i>{`作者：${author}`}</i></span>
      </header>
      <desc dangerouslySetInnerHTML={{__html: desc}}></desc>
      <footer className="clearfix">
        <div style={{float: 'right'}}>
          {tagList}
        </div>
      </footer>
    </li>
  )
})