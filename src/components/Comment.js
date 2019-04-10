import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDate } from '../util/helpers'
import { FaRegComment, FaEdit } from 'react-icons/fa'
import { Card, Row, Col }  from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti'
import { handleUpdateCommentVoteScore, handleDeleteComment } from '../actions/comments'
import Vote from './Vote'
import ReactMarkdown  from 'react-markdown'

class Comment extends Component {

    handleDelete = (e) => {
        e.preventDefault()

        const { dispatch, id } = this.props

        dispatch(handleDeleteComment(id))
    }

    handleDislike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('downVote')
    }

    handleLike = (e) => {
        e.preventDefault()
        this.handleVoteScoreChange('upVote')
    }

    handleVoteScoreChange(option) {
        const { dispatch, id } = this.props

        dispatch(handleUpdateCommentVoteScore(id, option))
    }

    render () {

        const { author, timestamp, body, voteScore} = this.props.comment
        const { id } = this.props

        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col className="center">
                            <Vote voteScore={voteScore} like={this.handleLike} dislike={this.handleDislike} />
                        </Col>
                        <Col md={10} sm={10}>
                            <Card.Subtitle className="mb-2 text-muted">{formatDate(timestamp)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Author: @{author}</Card.Subtitle>
                            <ReactMarkdown source={body} />
                        </Col>
                        <Col>
                            <button
                                className='icon-button'
                                onClick={this.handleDelete}>
                                <TiDelete />
                            </button>
                            <br />
                            <Link className="bottom-fixed" to={`/edit-comment/${id}`}>
                                <FaEdit />
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ comments }, { id }) {
    return {
        comment: comments[id]
    }
}

export default connect(mapStateToProps)(Comment)