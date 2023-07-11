import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk'; // puede hacer las request

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
                    // si tenes el compose RD instalado que sea ese, sino el compose comun de Redux
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;