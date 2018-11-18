import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './author.component.css';

export default class Author extends Component {
  _getFirstName() {
    return this.props.author.firstName;
  }

  _getLastName() {
    return this.props.author.lastName;
  }

  _getEditLink() {
    return `/books/${this.props.bookId}/authors/${this.props.author.authorId}`;
  }
  render() {
    return(
        <div className="row author">                 
          <div className="col-md-2">
          <Link to={this._getEditLink()}>{this._getLastName()}</Link>
          </div>
          <div className="col-md-2 ">
            <Link to={this._getEditLink()}>{this._getFirstName()}</Link>
          </div>
        </div>
    )
  }
}