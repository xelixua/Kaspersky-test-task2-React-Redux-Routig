import actions from '../constants/actions';

const getAll = (bookId) => ({
  type: actions.authors.getAll,
  bookId
});

const get = (bookId, authorId) => ({
  type: actions.authors.get,
  authorId,
  bookId
});

const save = (author, bookId) => ({
  type: actions.authors.save,
  author,
  bookId
});

const remove = (bookId, authorId) => ({
  type: actions.authors.remove,
  authorId,
  bookId
});

export default {
  getAll,
  get,
  save,  
  remove
};