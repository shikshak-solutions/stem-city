import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer';
// Middleware to save cart to localStorage
export const saveToLocalStorage = store => next => action => {
    let result = next(action);
    if (action.type === 'ADD_TO_CART' || action.type === 'REMOVE_FROM_CART') {
        const cart = store.getState().product.cartItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,saveToLocalStorage)));

export default store;

