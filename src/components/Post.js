import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaRegComment, FaEdit } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { Card, Row, Col }  from 'react-bootstrap';
import { formatDate } from '../util/helpers'
import Vote from './Vote';
import ReactMarkdown  from 'react-markdown'

class Post extends Component {

    handleDelete() {
        console.log("HANDLE DELETE")
    }

    handleDislike() {
        console.log("HANDLE DISLIKE")
    }

    handleLike() {
        console.log("HANDLE LIKE")
    }

    render() {
        const { id } = this.props
        const { author, body, category, commentCount, timestamp, title, voteScore } = this.props.post

        return (
            <Card>
                <div className='remove-button'>
                    <button
                        className='icon-button'
                        onClick={this.handleDelete}>
                        <TiDelete />
                    </button>
                </div>
                <Card.Body>
                    <Row>
                        <Col className="center">
                            <Vote voteScore={voteScore} like={this.handleLike} dislike={this.handleDislike} />
                        </Col>
                        <Col md={11} sm={11}>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{formatDate(timestamp)} - {category}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Author: @{author}</Card.Subtitle>
                            <Card.Text>
                                <ReactMarkdown source={body} />
                            </Card.Text>
                            <div className='card-footer'>
                                <Link to={`/edit-post/${id}`}>
                                    <FaEdit />
                                </Link>
                                <Link to={`/post/${id}`} >
                                    <FaRegComment />
                                </Link>
                                <span>{commentCount}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ posts }, { id }) {
    return {
        post: posts[id]
    }
}

export default connect(mapStateToProps)(Post)