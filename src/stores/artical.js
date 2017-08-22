import {observable,action} from 'mobx';

export default class ArticalStore{
  @observable articals;
  @action changeArticals = (data) => {
    this.articals = data;
  }
}