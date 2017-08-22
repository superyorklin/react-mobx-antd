import React from 'react';
import { Provider } from 'mobx-react';
import { Router , Route , hashHistory , IndexRoute } from 'react-router';
import LayoutIndex from './component/Layout';
import HomeIndex from './component/Home';
import AboutIndex from './component/About';
//import Store from './stores/artical.js';

//const store = new Store();
 
export default function App() {
  return (
    <Provider>
      <Router history={hashHistory}>
        <Route path='/' component={LayoutIndex}>
          <IndexRoute component={HomeIndex} />
          <Route path='about' component={AboutIndex} />
        </Route>
      </Router>
    </Provider>
  );
}
