import uuidv4 from 'uuid/v4';
import actions from '../constants/actions';

function reducer(authorsState = {
  currentAuthors: [],
  currentAuthor: {}
}, action) {
  const updatedAuthorsState = {
    ...authorsState
  };

  switch (action.type) {
    case actions.authors.getAll:
      let authors = [];
      if (action.bookId) {
        authors = JSON.parse(localStorage.getItem(action.bookId + '-authors')) || [];
      }
      updatedAuthorsState.currentAuthors = authors;
      return updatedAuthorsState;
    case actions.authors.get:
      authors = JSON.parse(localStorage.getItem(action.bookId + '-authors')) || [];
      const author = authors.find(author => author.authorId === action.authorId) || {};
      updatedAuthorsState.currentAuthor = author;
      return updatedAuthorsState;
    case actions.authors.save:
      authors = JSON.parse(localStorage.getItem(action.bookId + '-authors')) || [];
      if (action.author.authorId) {
        const index = authors.findIndex((author) => author.authorId === action.author.authorId);
        authors[index] = action.author;
      } else {
        action.author.authorId = 'author-' + uuidv4();
        authors.push(action.author);
      }
      localStorage.setItem(action.bookId + '-authors', JSON.stringify(authors));
      updatedAuthorsState.currentAuthor = action.author;
      updatedAuthorsState.currentAuthors = authors;
      return updatedAuthorsState;
    case actions.authors.remove:
      authors = JSON.parse(localStorage.getItem(action.bookId + '-authors')) || [];
      authors = authors.filter(author => author.authorId !== action.authorId);
      localStorage.setItem(action.bookId + '-authors', JSON.stringify(authors));
      updatedAuthorsState.currentAuthors = authors;
      return updatedAuthorsState;
    default:
      return authorsState;
  }
}

export default reducer;