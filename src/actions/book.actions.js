import actions from '../constants/actions';

const getAll = {
  type: actions.books.getAll
};

const get = (bookId) => ({
  type: actions.books.get,
  bookId
});

const save = (book) => ({
  type: actions.books.save,
  book
});

const remove = (bookId) => ({
  type: actions.books.remove,
  bookId
});

const sort = (field) => ({
  type: actions.books.sort,
  field
});

export default {
  getAll,
  get,
  save,
  remove,
  sort
};

