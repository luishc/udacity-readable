import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleReceiveComments } from '../actions/comments'
import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { Redirect } from 'react-router-dom'
import Message from './Message'

class CommentsPage extends Component {

    componentDidMount() {
        const { postId } = this.props.match.params
        this.props.dispatch(handleReceiveComments(postId))
    }

    render () {
        const { comments, post } = this.props
        console.log("POST", post)
        const { postId } = this.props.match.params
        
        return post 
            ? (
                <ul>
                    <li>
                        <Post id={postId} />
                    </li>
                    <li><CommentForm postId={postId}/></li>
                    
                    <li className='center'>
                        {comments.length !== 0 
                            ? <h3>Comments</h3>
                            : <Message message='No comments yet!' />
                        }
                    </li>
    
                    {comments.map((commentId) => (
                        <li key={commentId}>
                            <Comment id={commentId} />
                        </li>
                    ))}
                </ul>
            ) 
            : <Redirect to='/'/>
        
    }
}

function mapStateToProps({ comments, posts }, props) {
    const { postId } = props.match.params
    console.log("POST ID", postId)
    console.log("PARAMS", props.match)

    return {
        post: posts[postId],
        comments: 
            Object.keys(comments).filter((commentId) => comments[commentId].parentId === postId && comments[commentId].deleted === false)
            .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
    }
}

export default connect(mapStateToProps)(CommentsPage)