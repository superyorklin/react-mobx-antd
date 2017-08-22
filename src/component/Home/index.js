import React from 'react';
import {Pagination} from 'antd';
import './home.less';
import Interface from '../../interface/index';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';

@observer
export default class Home extends React.Component {

  @observable total = 0;
  @observable artical;
  @action changeArtical = (val) => {
    this.artical = val;
  }
  @action changeTotal = (val) => {
    this.total = val;
  }

  componentWillMount(){
    Interface.getAllArtical().then(res => {
      this.changeArtical(res.data);
      this.changeTotal(res.total);
    });
  }
  render(){
    return (
      <div>
        <div className='home-main'>
          <ul>
          </ul>
        </div>
        <footer className='pagination'>
          <Pagination showTotal={total => `总共${total}篇文章`} total={this.total} />
        </footer>
      </div>
    )
  }
}