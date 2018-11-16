import uuidv4 from 'uuid/v4';
import actions from '../constants/actions';

function reducer(authors = {}, action) {
  const updatedAuthorsState = {
    ...authors
  };

  switch (action.type) {
    case actions.authors.getAll:
      const authors = localStorage.get(action.bookId + '-authors');
      updatedAuthorsState.currentAuthors = authors;
      break;
    case actions.authors.get:
      authors = localStorage.get(action.bookId + '-authors');
      const author = authors.find(author => author.authorId === action.authorId);
      updatedAuthorsState.currentAuthor = author;
      break;
    case actions.authors.save:
      authors = localStorage.get(action.bookId + '-authors');
      if (author.authorId) {
        const index = authors.findIndex((author) => author.authorId === action.authorId);
        authors[index] = action.author;
      } else {
        author.authorId = 'author-' + uuidv4();
        authors.push(author);
      }     
      localStorage.setItem(action.bookId + '-authors', authors);
      break;
    case actions.authors.remove:
      authors = localStorage.get(action.bookId + '-authors');
      authors = authors.filter(author => author.bookId !== action.bookId);
      localStorage.setItem(action.bookId + '-authors', authors);
      updatedAuthorsState.currentAuthors = authors;
      break;
    default:
      break;
  }

  return updatedAuthorsState;
}

export default reducer;