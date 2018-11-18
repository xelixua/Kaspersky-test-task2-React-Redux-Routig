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
      <div className="books-list">
        <Controlls></Controlls>
        <div className="row">
        <div className="col-md-1">
          Обложка
        </div>
        <div className="col-md-11 row">
          <div className="col-md-3">
            Заголовок
          </div>
          <div className="col-md-3">
            Автор
          </div>
          <div className="col-md-1">
            Страниц
          </div>
          <div className="col-md-1">
            Издательство
          </div>
          <div className="col-md-1">
            Год издания
          </div>
          <div className="col-md-1">
            Дата выхода в тираж
          </div>
          <div className="col-md-2">
            ISBN
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
  console.log('mapStateToProps called', state);
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