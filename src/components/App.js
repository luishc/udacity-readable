import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import MyNav from './MyNav'
import Container from 'react-bootstrap/Container'
import Dashboard from './Dashboard'
import { handleInitialData } from '../actions/shared'
import NewPost from './NewPost';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
            <MyNav />
            <LoadingBar />
            <Container>
              {this.props.loading === true
                ? null
                : <div>
                    <Route  path='/' exact component={Dashboard}/>
                    <Route  path='/new-post' component={NewPost}/>
                  </div> }
            </Container>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App);