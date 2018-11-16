import React, { Component } from 'react';
import './addBook.component.css';
import locs from '../../constants/locs';
import Author from '../author/author.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/book.actions';

class AddBook extends Component {
  constructor(opts) {
    super(opts);
    const { get } = opts;
    get(opts.match.params.bookId);
  }

  _save(event) {
    event.preventDefault();
    console.log('saving book', document.bookInfo)
    const bookInfo = document.bookInfo;
    if (!bookInfo.valid) {
      return;
    }

    if (!this.props.authors.length) {
      return;
    }

    const book = {
      title: bookInfo.title,
      pagesCount: bookInfo.pagesCount
    };
    if (bookInfo.publisher) {
      book.publisher = bookInfo.publisher;
    }

    if (bookInfo.yearPublished) {
      book.yearPublished = bookInfo.yearPublished;      
    }

    if (bookInfo.printedDate) {
      book.printedDate = bookInfo.printedDate;
    }

    if (bookInfo.isbn) {
      book.isbn = bookInfo.isbn;
    }

    book.authors = this.props.authors;

    return this.props.save(book);
  }

  _cancel() {
    return this.props.cancel;
  }

  _getAuthors() {
    return this.props.authors.map(author =>
      <Author author={author}></Author>
    );
  }

  render() {
    return(
    <div>
      <form onSubmit={this._save} name="bookInfo">
        <div class="row">
          <div class="col-md-2">
            <button type="submit" onClick={this._save} class="btn btn-warning">loc.common.save</button>
          </div>
          <div class="col-md-2">
            <button type="button" onClick={this._cancel} class="btn btn btn-info">loc.common.cancel</button>
          </div>
        </div>


        <div class="row">
          <div class="col-md-4">{locs.editBook.title}</div>
          <div class="col-md-8">
            <input 
              name="title"
              type="text"
              class="form-control"
              required
              maxlength="30"
              value={this.props.book.title}
              >
            </input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.authors}</div>
          <div class="col-md-8">
            {this._getAuthors()}
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.pagesCount}</div>
          <div class="col-md-8">
            <input 
              name="pagesCount"
              type="numeric"
              class="form-control"
              required
              min="1"
              max="10000"
              value={this.props.book.pagesCount}
            >
            </input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.publisher}</div>
          <div class="col-md-8">
            <input 
              name="publisher"
              type="text"
              class="form-control"
              maxLength="30"
              value={this.props.book.publisher}
            >
            </input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.yearPublished}</div>
          <div class="col-md-8">
            <input 
                name="yearPublished"
                type="numeric"
                class="form-control"
                min="1800"
                value={this.props.book.yearPublished}
              >
            </input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.printedDate}</div>
          <div class="col-md-8">
            <input 
              name="printedDate"
              type="date"
              class="form-control"
              min="1800-01-01"
              value={this.props.book.printedDate}
            >
            </input>            
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">{locs.editBook.isbn}</div>
          <div class="col-md-8">
            <input 
                name="isbn"
                type="text"
                class="form-control"
                pattern="\d{10)\d{3}?"
                value={this.props.book.isbn}
              >
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <button type="submit" onClick={this._save} class="btn btn-warning">loc.common.save</button>
          </div>
          <div class="col-md-2">
            <button type="button" onClick={this._cancel} class="btn btn btn-info">loc.common.cancel</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

AddBook.propType = {
  book: PropTypes.object,
  get: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    book: state.books.currentBook
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (bookId) => {
      dispatch(actions.get(bookId));
    }
  };
};

const VisibleAddBook = connect(mapStateToProps, mapDispatchToProps)(AddBook);
export default VisibleAddBook;

