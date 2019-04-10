import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment, handleUpdateComment } from '../actions/comments'
import { generateUID } from '../util/helpers'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';

class CommentForm extends Component {

    state = {
        name: '',
        comment: '',
        isEditing: false,
        redirect: false,
    }

    componentDidMount() {
        const { commentToEdit } = this.props
        if(commentToEdit) {
            const {author, body} = commentToEdit
            this.setState({
                isEditing: true,
                name: author,
                comment: body,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
          e.stopPropagation()
        }

        this.setState({ validated: true });

        const {isEditing} = this.state

        if(isEditing) {
            const { commentToEdit } = this.props
            const comment = {
                ...commentToEdit,
                body: this.state.comment,
                author: this.state.name ? this.state.name : 'anonymous',
            }

            this.props.dispatch(handleUpdateComment(comment))
        } else {
            const comment = {
                id: generateUID(),
                timestamp: new Date().getTime(),
                body: this.state.comment,
                author: this.state.name ? this.state.name : 'anonymous',
                parentId: this.props.postId
            }
    
            this.props.dispatch(handleAddComment(comment))
        }

        this.setState(() => ({
            name: '',
            comment: '',
            redirect: isEditing
        }))
    }

    handleNameChange = (e) => {
        const name = e.target.value;

        this.setState({
            name
        })
    }

    handleCommentChange = (e) => {
        const comment = e.target.value;

        this.setState({
            comment
        })
    }

    render () {
        const { name, comment, redirect, validated } = this.state
        const { commentToEdit } = this.props
        if(redirect) {
            return <Redirect to={`/post/${commentToEdit.parentId}`} />
        }

        return (
            <div>
                <Form noValidatevalidated={validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Your name" 
                            onChange={this.handleNameChange} value={name} required />
                    </Form.Group>

                    <Form.Group controlId="formComment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" placeholder="What's in your mind?" 
                            rows="4" required onChange={this.handleCommentChange} value={comment} />
                    </Form.Group>

                    <Button variant="secundary" type="submit" color="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({comments}, props) {
    let mappedProps = {}

    if(props.match) {
        const {commentId} = props.match.params
        
        mappedProps['commentToEdit'] = comments[commentId]
    }

    return mappedProps
}

export default connect(mapStateToProps)(CommentForm)