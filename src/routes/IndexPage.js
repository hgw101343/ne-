import React from 'react';
import { connect } from 'dva';
import Home from './home/home'
import { Provider } from 'react-redux'
import store from '../store/store'
function IndexPage() {
  return (
    <Provider store={store}>
      <div>
        <Home></Home>
      </div>
    </Provider>
  );
}

IndexPage.propTypes = {
};

export default IndexPage;
