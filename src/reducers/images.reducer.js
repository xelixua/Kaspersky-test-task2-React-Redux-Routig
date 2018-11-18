import actions from '../constants/actions';

function reducer(imagesState = {
  currentImage: {}
}, action) {
  const updatedImagesState = {
    ...imagesState
  };

  switch (action.type) {
    case actions.images.get:
      let book = JSON.parse(localStorage.getItem(action.bookId)) || {};
      updatedImagesState.currentImage = book.image;
      return updatedImagesState;
    case actions.images.save:
      console.log('save action', action);
      book = JSON.parse(localStorage.getItem(action.bookId)) || {};
      book.image = action.image;
      console.log('book', book);
      localStorage.setItem(action.bookId, JSON.stringify(book));
      console.log('saved image on ', action.bookId);
      updatedImagesState.currentImage = action.image;
      return updatedImagesState;
    case actions.images.showImage:
      console.log('actions.images.showImage action', action);
      updatedImagesState.currentImage = action.base64Image;
      return updatedImagesState;
    case actions.images.remove:
      book = JSON.parse(localStorage.getItem(action.bookId)) || {};
      delete book.image;      
      localStorage.setItem(action.bookId, JSON.stringify(book));
      delete updatedImagesState.currentImage;
      return updatedImagesState;
    default:
      return imagesState;
  }
}

export default reducer;