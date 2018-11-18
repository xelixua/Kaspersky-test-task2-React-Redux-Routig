import actions from '../constants/actions';

function reducer(booksState = {
  all: [],
  currentBook: {}
}, action) {
  const updatedBooksState = {
    ...booksState
  };

  let bookIds = JSON.parse(localStorage.getItem('books')) || [];
  switch (action.type) {
    case actions.books.getAll:
      let books = bookIds.map(bookId => JSON.parse(localStorage.getItem(bookId)) || {});
      updatedBooksState.all = books;
      return updatedBooksState;
    case actions.books.get:
      let book = {};
      if (action.bookId) {
        book = JSON.parse(localStorage.getItem(action.bookId)) || {};
      }
      updatedBooksState.currentBook = book;
      return updatedBooksState;
    case actions.books.save:
      if (bookIds.indexOf(action.book.bookId) === -1) {
        bookIds.push(action.book.bookId);
        localStorage.setItem('books', JSON.stringify(bookIds));
      }

      localStorage.setItem(action.book.bookId, JSON.stringify(action.book));
      updatedBooksState.currentBook = action.book;      
      return updatedBooksState;
    case actions.books.remove:
      localStorage.removeItem(action.bookId);
      updatedBooksState.all = updatedBooksState.all
        .filter(({ bookId }) => bookId !== action.bookId);
      bookIds = JSON.parse(localStorage.getItem('books'));
      bookIds = bookIds.filter(bookId => bookId !== action.bookId);
      localStorage.setItem('books', JSON.stringify(bookIds));      
      return updatedBooksState;
    case actions.books.sort:
      books = bookIds.map(bookId => JSON.parse(localStorage.getItem(bookId)) || {});
      updatedBooksState.all = books.sort((a, b) => a[action.field] < b[action.field] ? 1 : -1);        
      break;
    default:
      return booksState;
  }

}

export default reducer;