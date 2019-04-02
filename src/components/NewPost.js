import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleAddPost, handleUpdatePost } from '../actions/post';
import { generateUID } from '../util/helpers'
import { Redirect } from 'react-router-dom'

class NewPost extends Component {

    constructor () {
        super()

        this.state = {
            isEditing: false,
            validated: false,
            category: '',
            name: '',
            title: '',
            post: '',
            redirect: false
        }
    }
    
    componentDidMount() {
        const { postToEdit } = this.props

        if(postToEdit) {
            const { author, body, category, title } = postToEdit
            this.setState({
                isEditing: true,
                name: author,
                post: body,
                category,
                title
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
          event.stopPropagation()
        }

        this.setState({ validated: true });

        const { dispatch, postToEdit } = this.props
        
        const post = {
            id: !this.state.isEditing ? generateUID() : postToEdit.id,
            timestamp: !this.state.isEditing ? new Date().getTime() : postToEdit.timestamp,
            title: this.state.title,
            body: this.state.post,
            author: this.state.name ? this.state.name : 'anonymous',
            category: this.state.category
        }

        if(!this.state.isEditing){
            dispatch(handleAddPost(post))
        } else {
            dispatch(handleUpdatePost(post))
        }

        this.setState(() => ({
            redirect: true
        }))
    }

    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.setState({
            category
        })
    }

    handleNameChange = (e) => {
        const name = e.target.value
        this.setState({
            name
        })
    }

    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState({
            title
        })
    }

    handlePostChange = (e) => {
        const post = e.target.value
        this.setState({
            post
        })
    }

    render() {
        const { name, post, category, title, validated, redirect } = this.state

        if(redirect){
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1>New Post</h1>
                <Form noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}>

                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" required value={category} onChange={this.handleCategoryChange}>
                            <option value='' disabled>Select the category</option>
                            {Object.keys(this.props.categories).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Your name" 
                            onChange={this.handleNameChange} value={name} required />
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title"
                            onChange={this.handleTitleChange} value={title} required />
                    </Form.Group>

                    <Form.Group controlId="formText">
                        <Form.Label>Post</Form.Label>
                        <Form.Control as="textarea" placeholder="What's in your mind?" 
                            rows="4" required onChange={this.handlePostChange} value={post} />
                    </Form.Group>

                    <Button variant="secundary" type="submit" color="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({categories, posts}, props){

    const { id } = props.match.params

    return {
        categories,
        postToEdit: posts[id]
    }
}

export default connect(mapStateToProps)(NewPost)