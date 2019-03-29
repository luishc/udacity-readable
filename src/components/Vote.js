import React, { Component } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { Row }  from 'react-bootstrap';

class Vote extends Component {

    render() {
        return (
            <div>
                <Row>
                    <button className="icon-button-transparent" onClick={this.props.like}>
                        <TiArrowSortedUp size="3em" color="#bbc0c4" />
                    </button>
                </Row>
                <Row>
                    <span className='vote-score'>{this.props.voteScore}</span>
                </Row>
                <Row>
                    <button className="icon-button-transparent" onClick={this.props.dislike}>
                        <TiArrowSortedDown size="3em" color="#bbc0c4" />
                    </button>
                </Row>
            </div>
        )
    }
}

export default Vote