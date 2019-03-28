import { getPostsByCategory, getPosts, getInitialData } from '../api/ReadableAPI'
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FILTER_POSTS = 'FILTER_POSTS'

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