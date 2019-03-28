import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import post from './post'
import category from './category'

export default combineReducers({
    loadingBar: loadingBarReducer,
    posts: post,
    categories: category
})