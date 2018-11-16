import uuidv4 from 'uuid/v4';
import actions from '../constants/actions';

function reducer(images = {}, action) {
  const updatedImagesState = {
    ...images
  };

  switch (action.type) {
    case actions.images.get:
      const image = localStorage.getItem('image-' + action.bookId);
      updatedImagesState.currentImage = image;
      break;
    case actions.images.save:
      localStorage.setItem('image-' + action.bookId, action.image);
      break;
    case actions.images.remove:
      localStorage.removeItem('image-' + action.bookId);
      delete updatedImagesState.currentImage;
      break;
    default:
      break;
  }

  return updatedImagesState;
}

export default reducer;