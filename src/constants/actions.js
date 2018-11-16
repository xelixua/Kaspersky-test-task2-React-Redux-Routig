const actions = {
  books: {
    getAll: 'GET_BOOKS',
    get: 'GET_BOOK',
    save: 'SAVE_BOOK',
    remove: 'REMOVE_BOOK',
    sort: 'SORT_BOOKS'
  },
  authors: {
    getAll: 'GET_AUTHORS',
    get: 'GET_AUTHOR',
    save: 'SAVE_AUTHOR',
    remove: 'REMOVE_AUTHOR'
  },
  images: {
    get: 'GET_IMAGE',
    save: 'SAVE_IMAGE',    
    remove: 'REMOVE_IMAGE'
  }
};

export default actions;