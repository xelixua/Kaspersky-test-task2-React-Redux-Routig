import React, { Component } from 'react';
import './authors.component.css';
import Author from '../author/author.component';

export default class Authors extends Component {
  _getAuthors() {
    return(
      this.props.authors.map(author =>
        <Author author={author} bookId={this.props.bookId}></Author>
      )
    )
  }

  render() {
    return(
      <div>
        {this._getAuthors()}
      </div>
    )    
  }
}