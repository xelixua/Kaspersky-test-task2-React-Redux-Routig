import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './book.component.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import authorActions from '../../actions/author.actions';
import imageActions from '../../actions/image.actions';

class Book extends Component {
  constructor(opts) {
    super(opts);
    const { getAuthors, getImage } = opts;
    getAuthors(this.props.book.bookId);
    getImage(this.props.book.bookId);
  }

  _getTitle() {
    return this.props.book.title;
  }

  _getAuthors() {
    return this.props.book.authors.join(',');
  }

  _getPagesCount() {
    return this.props.book.pagesCount;
  }

  _getPublisherName() {
    return this.props.book.publisher;
  }

  _getYearPublished() {
    return this.props.book.yearPublished;
  }

  _getPrintedDate() {
    return moment(this.props.book.printedDate).format('DD MM YYYY')
  }

  _getISBN() {
    return this.props.book.isbn;
  }


  render() {
    return(
      <div className="row">
        <div className="col-md-1">          
          <Link to={`/books/${this.props.book.bookId}/image`}><img className="book-list-thumbnail" src={this.props.book.image}></img></Link>
        </div>
        <div className="col-md-11 row">
          <div className="col-md-3">
            <Link to={'/books/' + this.props.book.bookId}>{this._getTitle()}</Link>
          </div>
          <div className="col-md-3">
            {this._getAuthors()}
          </div>
          <div className="col-md-1">
            {this._getPagesCount()}
          </div>
          <div className="col-md-1">
            {this._getPublisherName()}
          </div>
          <div className="col-md-1">
            {this._getYearPublished()}
          </div>
          <div className="col-md-1">
            {this._getPrintedDate()}
          </div>
          <div className="col-md-2">
            {this._getISBN()}
          </div>
        </div>
      </div>
    );
  }
}

Book.propType = {
  getAuthors: PropTypes.func.isRequired,
  getImage: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string
};

const mapStateToProps = state =>  {
  return {
    authors: state.authors.currentAuthors,
    images: state.images.currentImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: (bookId) => {
      dispatch(authorActions.getAll(bookId));
    },
    getImage: (bookId) => {
      dispatch(imageActions.get(bookId));
    }
  };
};

const VisibleBook = connect(mapStateToProps, mapDispatchToProps)(Book);
export default VisibleBook;