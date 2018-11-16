import React, { Component } from 'react';
import './books.component.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Controlls from '../controlls/controlls.component';
import Book from '../book/book.component';
import actions from '../../actions/book.actions';

class Books extends Component {
  constructor(opts) {
    super(opts);
    const { getBooks } = opts;
    getBooks();
  }
  render() {
    return(
      <div>
        <Controlls></Controlls>
        {this.props.books.map(book => 
          <Book book={book}></Book>
        )}
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