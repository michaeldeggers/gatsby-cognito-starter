import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
    if (action.type === `LOG_IN`) {
        return Object.assign({}, state, {
            loggedIn: true,
        });
    }
    if (action.type === `LOG_OUT`) {
        return Object.assign({}, state, {
            loggedIn: false,
        });
    }
    return state;
};

const createStore = (initialState) => reduxCreateStore(reducer, initialState);
export default createStore;
