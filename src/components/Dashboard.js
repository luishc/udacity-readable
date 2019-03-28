import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message'

class Dashboard extends Component {
    render() {
        let { posts } = this.props

        return (
            <div>
                <ul className='dashboard-list'>
                    {posts.length !== 0 ? 
                        this.props.posts.map((post) => (
                            <li key={post.id}>
                                {post.title}
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

function mapStateToProps ({posts}) {
    const orderedPosts = Object.values(posts)
                    .sort((a,b) => b.timestamp - a.timestamp)
    return {
        posts: orderedPosts,
    }
}

export default connect(mapStateToProps)(Dashboard);