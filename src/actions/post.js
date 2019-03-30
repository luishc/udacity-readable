import { getPostsByCategory, getPosts, votePost } from '../api/ReadableAPI'
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE'

export function receivePosts (posts) {
    console.log(posts)
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function filterPosts (posts) {
    return {
        type: FILTER_POSTS,
        posts
    }
}

export function filterPostsByCategory(category) {
    return (dispatch) => {
        dispatch(showLoading())

        if(category !== ''){
            return getPostsByCategory(category)
            .then((data) => {
                console.log(data)
                dispatch(filterPosts(data))
            })
            .finally(() => dispatch(hideLoading()))
        } else {
            return getPosts()
                .then((posts) => {
                    dispatch(filterPosts(posts.reduce((map, key) => {
                        map[key.id] = key
                        return map
                    }, {})))
                })
                .catch((error) => {
                    console.warn(error);
                    alert('There was an error filtering. Try again');
                })
                .finally(
                    dispatch(hideLoading())
                )
        }
    }
}

function updatePostVoteScore(postId, voteScore) {
    return {
        type: UPDATE_POST_VOTE_SCORE,
        postId,
        voteScore
    }
}

export function handleUpdatePostVoteScore(postId, option) {
    return (dispatch) => {
        dispatch(showLoading())

        return votePost(postId, option)
            .then(res => dispatch(updatePostVoteScore(postId, res.voteScore)))
            .catch(() => console.log("ERROR"))
            .finally(dispatch(hideLoading()))
    }
}