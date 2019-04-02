import { showLoading, hideLoading } from 'react-redux-loading'
// import { receivePosts } from '../actions/post'
import { receiveCategories } from './category'
import { getInitialData } from '../api/ReadableAPI'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
        .then((data) => {
            // dispatch(receivePosts(data.posts))
            dispatch(receiveCategories(data.categories))
        })
        //.catch(() => dispatch(flashErrorMessage('Error while getting initial data!')))
        .finally(() => dispatch(hideLoading()))
    }
}