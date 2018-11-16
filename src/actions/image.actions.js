import actions from '../constants/actions';

const get = (bookId) => ({
  type: actions.images.get,
  bookId
});

const save = (image, bookId) => ({
  type: actions.images.save,
  image,
  bookId
});

const remove = (bookId) => ({
  type: actions.images.remove,
  bookId
});

export default {
  get,
  save,
  remove
};