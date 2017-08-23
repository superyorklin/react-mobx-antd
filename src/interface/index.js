import API from './api';
import fetch from '../utils/fetch';

class Interface{

  getAllArtical(data){
    return fetch.get(API.GET_ALL_ARTICAL,data);
  }
  getArchive(){
    return fetch.get(API.GET_ARCHIVE);
  }
}

export default new Interface();