import React from 'react';
import { Provider } from 'mobx-react';
import { Router , Route , hashHistory , IndexRedirect } from 'react-router';
import LayoutIndex from './component/Layout';
import HomeIndex from './component/Home';

export default function App() {
  return (
    <Provider>
      <Router history={hashHistory}>
        <Route path='/' component={LayoutIndex}>
          <Route path='/' component={HomeIndex} />
        </Route>
      </Router>
    </Provider>
  );
}
