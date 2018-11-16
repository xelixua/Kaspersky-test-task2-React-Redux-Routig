import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './author.component.css';

export default class Author extends Component {
  _getFirstName() {
    return this.props.firstName;
  }

  _getSecondName() {
    return this.props.secondName;
  }
  render() {
    return(
        <div class="row">
          <div class="col-md-6">
            <Link to={'/authors/' + this.props.bookId}>{this._getFirstName()}</Link>
          </div>
          <div class="col-md-6">
          <Link to={'/authors/' + this.props.bookId}>{this._getSecondName()}</Link>
          </div>
        </div>
    )
  }
}