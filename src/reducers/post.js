import { RECEIVE_POSTS, FILTER_POSTS, UPDATE_POST_VOTE_SCORE } from '../actions/post'

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
        case UPDATE_POST_VOTE_SCORE :
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    voteScore: action.voteScore
                }
            }
        default :
            return state
    }
}