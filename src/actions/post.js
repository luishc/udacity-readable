import { getPostsByCategory, getPosts, votePost, removePost, savePost, editPost } from '../api/ReadableAPI'
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'
export const UPDATE_POST_VOTE_SCORE = 'UPDATE_POST_VOTE_SCORE'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'

export function receivePosts (posts) {
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

function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function handleDeletePost(postId) {
    return (dispatch, getState) => {
        dispatch(showLoading())

        const post = getState().posts[postId]
        dispatch(deletePost(postId))

        return removePost(postId)
            .then(() => dispatch(hideLoading()))
            .catch(() => {
                dispatch(addPost(post))
                console.log("Error on remove post")
            })
            .finally(dispatch(hideLoading()))
    }
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost(post) {
    return(dispatch) => {
        dispatch(showLoading())

        return savePost(post)
            .then(res => {
                console.log(res)
                dispatch(addPost(res))
            })
            .catch((e) => {
                console.log("POST ID", post.id)
                console.log("ERRO AO SALVAR POST", e)
                dispatch(deletePost(post.id))
            })
            .finally(() => {
                dispatch(hideLoading())
            })
    }
}

export function handleUpdatePost(post) {
    return (dispatch, getState) => {

        const originalPost = getState().posts[post.id]

        dispatch(showLoading())
        dispatch(addPost(post))

        return editPost(post)
            .catch(() => {
                dispatch(addPost(originalPost))
                console.log("ERRO AO EDITAR POST")
            })
            .finally(() => dispatch(hideLoading()))
    }
}