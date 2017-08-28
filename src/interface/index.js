import API from './api';
import fetch from '../utils/fetch';

class Interface{

  getAllArtical(data){
    return fetch.get(API.GET_ALL_ARTICAL,data);
  }
  getArchive(){
    return fetch.get(API.GET_ARCHIVE);
  }
  getComment(data){
    return fetch.get(API.GET_COMMENT,data);
  }
  postComment(data){
    return fetch.post(API.POST_COMMENT,data);
  }
}

export default new Interface();