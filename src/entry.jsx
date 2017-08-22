import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { message } from 'antd';

import { AppContainer } from 'react-hot-loader';
import App from './App'

//样式
import 'antd/dist/antd.min.css';
import './assets/fonts/iconfont/iconfont.css';
import './assets/styles/common.less';
import './assets/styles/base.less';
useStrict(true);

// antd 全局设置
message.config({
  duration: 3
});

if (process.env.NODE_ENV === 'development') {
  
}
//热更新
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById('react')
  );
};

render(<App />);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(<NextApp />);
  });
}