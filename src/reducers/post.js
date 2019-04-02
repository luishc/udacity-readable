import { RECEIVE_POSTS, 
    FILTER_POSTS, 
    UPDATE_POST_VOTE_SCORE,
    DELETE_POST, 
    ADD_POST} from '../actions/post'

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
        case DELETE_POST:
            return {
                ...Object.keys(state)
                    .filter(key => key !== action.postId)
                    .reduce((result, current) => {
                        result[current] = state[current]
                        return result
                    }, {})  
            }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...action.post
                }
                
            }
        default :
            return state
    }
}