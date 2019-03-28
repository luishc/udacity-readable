import { RECEIVE_POSTS, FILTER_POSTS } from '../actions/post'

export default function post (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS : 
            return {
                ...state,
                ...action.posts
            }
        case FILTER_POSTS: 
            return {
                ...action.posts
            }
        default :
            return state
    }
}