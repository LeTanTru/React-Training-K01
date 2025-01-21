import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from '@/App';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'https://mithril-rem.fly.dev/api';

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
