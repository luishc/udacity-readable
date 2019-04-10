import { RECEIVE_COMMENTS, ADD_COMMENT, UPDATE_COMMENT_VOTE_SCORE, DELETE_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS :
            return {
                ...state,
                ...action.comments,
            }
        case ADD_COMMENT : 
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case UPDATE_COMMENT_VOTE_SCORE :
            return {
                ...state,
                [action.commentId]: {
                    ...state[action.commentId],
                    voteScore: action.voteScore
                }
            }
        case DELETE_COMMENT :
            return {
                ...state,
                [action.commentId] : {
                    ...state[action.commentId],
                    deleted: true
                }
            }
        default : 
            return state
    }
}