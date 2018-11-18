import React, { Component } from 'react';
import './authors.component.css';
import Author from '../author/author.component';
import locs from '../../constants/locs';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

export default class Authors extends Component {  
  _getAuthors() {
    if (!this.props.authors.length) {
      return(<div>
        {locs.noAuthors}
      </div>)
    }

    return(
      <div>
        {
         this.props.authors.map((author, index) =>
          <Author key={`author-${index}`} author={author} bookId={this.props.bookId}></Author>
          )
        }  
      </div>
    )
  }

  render() {
    return(
      <div className="authors">
        <Link to={`/books/${this.props.bookId}/authors/${uuidv4()}`}><div className="col-md-1">&#43;</div></Link>
        {this._getAuthors()}
      </div>
    )    
  }
}