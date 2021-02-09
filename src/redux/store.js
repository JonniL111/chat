import messanges from './reducers/index';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(messanges, composeWithDevTools());

export default store;
