import React, { Component } from 'react';
import './addBook.component.css';
import locs from '../../constants/locs';
import Authors from '../authors/authors.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/book.actions';
import authorActions from '../../actions/author.actions';
import { Link } from 'react-router-dom';


class AddBook extends Component {
  constructor(opts) {
    super(opts);
    const { get, save, remove, getAuthors } = opts;
    this.save = save;
    this.remove = remove;
    const { match: { params: { bookId } } } = opts;
    this.bookId = bookId;
    get(bookId);
    getAuthors(bookId);
  }

  _getBookId() {
    return this.bookId || this.props.book.bookId;
    
  }

  _save(event) {
    event.preventDefault();
    const form = document.getElementById("bookInfoForm");
    const formIsValid = Array.from(form.elements).every(element => {
      return element.validity.valid;
    });
    if (!formIsValid) {
      return;
    }

    if (!this.props.authors.length) {
      return;
    }

    this.props.book.bookId = this.bookId;
    this.props.book.authors = this.props.authors.map(author => author.firstName + ' ' + author.lastName);
    this.save(this.props.book);
    window.location.replace('/');
  }

  _remove(event) {
    event.preventDefault();
    this.remove(this.props.book.bookId);
    window.location.replace('/');
  }

  _getRemoveButton () {
    if (!this.props.book.bookId) {
      return('');
    }

    return (
      <div className="col-md-2">
        <button type="button" onClick={this._remove.bind(this)} className="btn btn-danger">{locs.common.remove}</button>
      </div>
    );
  }

  _valueChanged({ target: { name, value }}) {
    this.props.book[name] = value;
  }

  render() {
    return(
    <div>
      <h1>{locs.editBook.header}</h1>
      <form id="bookInfoForm" onSubmit={this._save.bind(this)} name="bookInfo">
        <div className="row book-controlls-buttons">
          <div className="col-md-2">
            <button type="submit" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
          </div>
          <div className={`col-md-${this.props.book.bookId ? '6' : '8'}`}>
            <Link to={`/books/${this._getBookId()}/image`}><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.editImage}</button></Link>
          </div>
          {this._getRemoveButton()}
          <div className="col-md-2">
            <Link to="/"><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.cancel}</button></Link>
          </div>
        </div>

        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.title}</div>
          <div className="col-md-8">
            <input 
              name="title"
              type="text"
              className="form-control"
              required
              maxLength="30"
              value={this.props.book.title}
              onChange={this._valueChanged.bind(this)}
              >
            </input>
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.authors}</div>
          <div className="col-md-8">
            <Authors
              authors={this.props.authors}
              bookId={this._getBookId()}
            ></Authors>
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.pagesCount}</div>
          <div className="col-md-8">
            <input 
              name="pagesCount"
              type="numer"
              className="form-control"
              required
              min="1"
              max="10000"
              value={this.props.book.pagesCount}
              onChange={this._valueChanged.bind(this)}
            >
            </input>
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.publisher}</div>
          <div className="col-md-8">
            <input 
              name="publisher"
              type="text"
              className="form-control"
              maxLength="30"
              value={this.props.book.publisher}
              onChange={this._valueChanged.bind(this)}
            >
            </input>
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.yearPublished}</div>
          <div className="col-md-8">
            <input 
                name="yearPublished"
                type="numer"
                className="form-control"
                min="1800"
                value={this.props.book.yearPublished}
                onChange={this._valueChanged.bind(this)}
              >
            </input>
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.printedDate}</div>
          <div className="col-md-8">
            <input 
              name="printedDate"
              type="date"
              className="form-control"
              min="1800-01-01"
              value={this.props.book.printedDate}
              onChange={this._valueChanged.bind(this)}
            >
            </input>            
          </div>
        </div>
        <div className="row book-input">
          <div className="col-md-4">{locs.editBook.isbn}</div>
          <div className="col-md-8">
            <input 
                name="isbn"
                type="text"
                className="form-control"
                pattern="^\d{10}\d{3}?$"
                value={this.props.book.isbn}
                onChange={this._valueChanged.bind(this)}
              >
            </input>
          </div>
        </div>

        <div className="row book-controlls-buttons">
          <div className="col-md-2">
            <button type="submit" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
          </div>
          <div className={`col-md-${this.props.book.bookId ? '6' : '8'}`}>
            <Link to={`/books/${this._getBookId()}/image`}><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.editImage}</button></Link>
          </div>
          {this._getRemoveButton()}
          <div className="col-md-2">
            <Link to="/"><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.cancel}</button></Link>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

AddBook.propType = {
  book: PropTypes.object,
  authors: PropTypes.arrayOf(PropTypes.object),
  get: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    book: state.books.currentBook,
    authors: state.authors.currentAuthors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (bookId) => {
      dispatch(actions.get(bookId));
    },
    getAuthors: (bookId) => {
      dispatch(authorActions.getAll(bookId));
    },
    save: (book) => {
      dispatch(actions.save(book));
    },
    remove: (bookId) => {
      dispatch(actions.remove(bookId));
    }
  };
};

const VisibleAddBook = connect(mapStateToProps, mapDispatchToProps)(AddBook);
export default VisibleAddBook;

