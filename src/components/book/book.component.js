import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './book.component.css';
import Authors from '../authors/authors.component';
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
    return (<Authors authors={this.props.authors} bookId={this.props.book.bookId}></Authors>)
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
      <div class="row">
        <div class="col-md-3">          
          <Link to={'/images/' + this.props.book.bookId}><img src={this.props.book.image}></img></Link>
        </div>
        <div class="col-md-9 row">
          <div class="col-md-2">
            <Link to={'/books/' + this.props.book.bookId}>{this._getTitle()}</Link>
          </div>
          <div class="col-md-2">
            {this._getAuthors()}
          </div>
          <div class="col-md-2">
            {this._getPagesCount()}
          </div>
          <div class="col-md-2">
            {this._getPublisherName()}
          </div>
          <div class="col-md-2">
            {this._getYearPublished()}
          </div>
          <div class="col-md-2">
            {this._getPrintedDate()}
          </div>
          <div class="col-md-2">
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