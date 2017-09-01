import React from 'react';
import { Provider } from 'mobx-react';
import { Router , Route , hashHistory , IndexRoute } from 'react-router';
import LayoutIndex from './component/Layout';
import HomeIndex from './component/Home';
import AboutIndex from './component/About';
import ArchiveIndex from './component/Archive';
import ArticalIndex from './component/Artical';
import RecommendIndex from './component/Recommend';
import Store from './stores/artical.js';

const store = new Store();
 
export default function App() {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={LayoutIndex}>
          <IndexRoute component={HomeIndex} />
          <Route path='about' component={AboutIndex} />
          <Route path='archive' component={ArchiveIndex} />
          <Route path='artical/:id' component={ArticalIndex} />
          <Route path='recommend' component={RecommendIndex} />
        </Route>
      </Router>
    </Provider>
  );
}
