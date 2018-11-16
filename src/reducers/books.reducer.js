import uuidv4 from 'uuid/v4';
import actions from '../constants/actions';

function reducer(books = {}, action) {
  console.log('books', books);
  const updatedBooksState = {
    ...books
  };

  switch (action.type) {
    case actions.books.getAll:
      const books = localStorage.getItem('books');
      updatedBooksState.all = books;
      break;
    case actions.books.get:
      if (!action.bookId) {
        return books;
      }       
      const book = localStorage.getItem(action.bookId);
      updatedBooksState.currentBook = book;
      break;
    case actions.books.save:
      if (book.bookId) {
        const index = updatedBooksState.all.findIndex((book) => book.bookId === bookId);
        updatedBooksState.all[index] = action.book;
      } else {
        book.bookId = uuidv4();
        updatedBooksState.all.push(book);
      }
      updatedBooksState.currentBook = book;
      localStorage.setItem('book', updatedBooksState.all);

      const bookId = book.bookId || 'book-' + uuidv4();
      book.bookId = bookId;
      localStorage.setItem(bookId, book);      
      break;
    case actions.books.remove:
      localStorage.removeItem(bookId);
      updatedBooksState.all = updatedBooksState.all
        .filter(({ bookId }) => bookId !== action.bookId);
      localStorage.setItem('book', updatedBooksState.all);
      break;
    case actions.books.sort:
      books = localStorage.getItem('books');
      books = books.sort((a, b) => a[action.field] < b[action.field]);
      updatedBooksState.all = books;
      break;
    default:
      break;
  }

  return updatedBooksState;
}

export default reducer;