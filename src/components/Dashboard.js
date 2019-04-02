import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message'
import Post from './Post';
import { filterPostsByCategory } from '../actions/post';

class Dashboard extends Component {

    componentDidMount() {
        const { dispatch, category } = this.props

        dispatch(filterPostsByCategory(category))
    }

    render() {
        let { posts } = this.props

        return (
            <div>
                <ul className='dashboard-list'>
                    {posts.length !== 0 ? 
                        this.props.posts.map((post) => (
                            <li key={post.id}>
                                <Post id={post.id} />
                            </li>))
                        : <li className='center'>
                            <Message message='No posts yet!' />
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({posts}, props) {

    const orderedPosts = Object.values(posts)
                    .sort((a,b) => b.timestamp - a.timestamp)
    return {
        posts: orderedPosts,
        category: props.match.params.category
    }
}

export default connect(mapStateToProps)(Dashboard);