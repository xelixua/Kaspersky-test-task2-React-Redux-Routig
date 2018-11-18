import actions from '../constants/actions';

const get = (bookId) => ({
  type: actions.images.get,
  bookId
});

const save = (bookId, image) => ({
  type: actions.images.save,
  image,
  bookId
});

const showImage = (base64Image) =>  ({
  type: actions.images.showImage,
  base64Image
});

const remove = (bookId) => ({
  type: actions.images.remove,
  bookId
});

export default {
  get,
  save,
  showImage,
  remove
};