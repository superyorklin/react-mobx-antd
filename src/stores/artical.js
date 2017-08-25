import {observable,action} from 'mobx';

export default class ArticalStore{
  @observable curr = 0;
  @action changeCurr = (data) => {
    this.curr = data;
  }
}