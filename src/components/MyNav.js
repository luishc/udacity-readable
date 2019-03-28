import React, { Component } from 'react'
import { Navbar, Nav }  from 'react-bootstrap';
import CategorySelection from './CategorySelection';
import { connect } from 'react-redux'
import { filterPostsByCategory } from '../actions/post'

class MyNav extends Component {

    state = {
        selectedCategory: ''
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({
            selectedCategory
        })

        const { dispatch } = this.props

        dispatch(filterPostsByCategory(selectedCategory))
    }

    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Readable</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/' active={window.location.pathname === '/'}>Home</Nav.Link>
                        <Nav.Link href="/new-post" active={window.location.pathname === '/new-post'}>New Post</Nav.Link>
                    </Nav>
                    { window.location.pathname === '/' &&
                        <Nav>
                            <CategorySelection
                                selectedCategory={this.state.selectedCategory}
                                handleCategoryChange={this.handleCategoryChange} />
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps ({posts}) {
    return {
        posts,
    }
}

export default connect(mapStateToProps)(MyNav)