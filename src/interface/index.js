import API from './api';
import fetch from '../utils/fetch';

class Interface{

  getAllArtical(){
    return fetch.get(API.GET_ALL_ARTICAL);
  }
}

export default new Interface();