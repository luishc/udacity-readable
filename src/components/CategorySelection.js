import React, { Component } from 'react'
import { connect } from 'react-redux';

class CategorySelection extends Component {
    
    handleCategoryChange = (e) => {
        const category = e.target.value;
        this.props.handleCategoryChange(category)
    }

    render () {
        const { selectedCategory } = this.props.selectedCategory
        return (
            <select 
                className={selectedCategory === '' ? 'input default-selected' : 'input'}
                value={selectedCategory}
                onChange={this.handleCategoryChange}>
                <option value=''>All categories</option>
                {Object.keys(this.props.categories).map((key) => (
                    <option key={key} value={this.props.categories[key].name}>{this.props.categories[key].name}</option>
                ))}
            </select>
        )
    }
}

CategorySelection.defaultProps = { selectedCategory: '' };

function mapStateToProps ({categories}) {
    return {
        categories,
    }
}

export default connect(mapStateToProps)(CategorySelection)