import React, { Component } from 'react';
import './books.component.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Controlls from '../controlls/controlls.component';
import Book from '../book/book.component';
import actions from '../../actions/book.actions';
import locs from '../../constants/locs';

class Books extends Component {
  constructor(opts) {
    super(opts);
    const { getBooks } = opts;
    getBooks();
  }
  render() {
    return(
      <div className="books-list">
        <Controlls></Controlls>
        <div className="row">
        <div className="col-md-1">
          {locs.common.thumbnail}
        </div>
        <div className="col-md-11 row">
          <div className="col-md-3">
          {locs.common.title}
          </div>
          <div className="col-md-3">
          {locs.common.author}
          </div>
          <div className="col-md-1">
          {locs.common.pages}
          </div>
          <div className="col-md-1">
          {locs.common.publisher}
          </div>
          <div className="col-md-1">
          {locs.common.yearPublished}
          </div>
          <div className="col-md-1">
          {locs.common.printedDate}
          </div>
          <div className="col-md-2">
          {locs.common.isbn}
          </div>
        </div>
      </div>
        {this.props.books.map((book, index) => {          
          return <Book key={'book-' + index} book={book}></Book>
        })}
      </div>      
    )
  }
}

Books.propType = {
  books: PropTypes.arrayOf(PropTypes.object),
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    books: state.books.all
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooks: () => {
      dispatch(actions.getAll);
    }
  };
};

const VisibleBooks = connect(mapStateToProps, mapDispatchToProps)(Books);
export default VisibleBooks;