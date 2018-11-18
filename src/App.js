import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import './components/books/books.component';
import Books from './components/books/books.component';
import AddBook from './components/addBook/addBook.component';
import AddAuthor from './components/addAuthor/addAuthor.component';
import AddImage from './components/addImage/addImage.component';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Books} />
          <Route path="/books/:bookId" exact={true} component={AddBook} />
          <Route path="/books/:bookId/authors/:authorId" component={AddAuthor} />
          <Route path="/books/:bookId/image" component={AddImage} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
