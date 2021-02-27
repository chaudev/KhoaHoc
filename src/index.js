import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/reducers';
import AppContainer from './Container/AppContainer';
import rootSaga from './redux/middleware/sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);
