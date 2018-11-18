import React, { Component } from 'react';
import './addAuthor.component.css';
import locs from '../../constants/locs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/author.actions';
import { Link } from 'react-router-dom';

class AddAuthor extends Component {
  constructor(opts) {
    super(opts);
    const { save, remove, match: { params: { bookId, authorId } } } = opts;
    this.save = save;
    this.remove = remove;
    this.bookId = bookId;
    opts.get(this.bookId, authorId);
  }

  _getFirstName() {
    return this.props.author.firstName;
  }

  _getLastName() {
    return this.props.author.lastName;
  }

  _valueChanged({ target: { name, value }}) {
    this.props.author[name] = value;
  }

  _getRemoveButton () {
    if (!this.props.author.authorId) {
      return ('');
    }

    return (
      <div className="col-md-2">
        <button type="button" onClick={this._remove.bind(this)} className="btn btn-danger">{locs.common.remove}</button>
      </div>
    );
  }
  
  _getBookId () {
    return this.bookId || this.props.bookId;
  }


  
  _save(event) {
    event.preventDefault();
    const form = document.getElementById("authorInfoForm");
    const formIsValid = Array.from(form.elements).every(element => {
      return element.validity.valid;
    });
    if (!formIsValid) {
      return;
    }

    this.save(this.props.author, this._getBookId());
    window.location.replace(`/books/${this.bookId}`);
  }

  _remove(event) {
    event.preventDefault();
    this.remove(this._getBookId(), this.props.author.authorId);
    window.location.replace(`/books/${this.bookId}`);
  }

  render() {
    return(
      <div>
        <h1>{locs.editAuthor.header}</h1>
        <form id="authorInfoForm" onSubmit={this._save.bind(this)} name="authorInfo">
          <div className="row author-controlls-buttons">
            <div className={`col-md-${this.props.author.authorId ? '8' : '10'}`}>
              <button type="submit" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
            </div>
            {this._getRemoveButton()}
            <div className="col-md-2">
              <Link to={`/books/${this.bookId}`}><button type="button" className="btn btn btn-info">{locs.common.cancel}</button></Link>
            </div>            
          </div>

          <div className="row  author-input">           
            <div className="col-md-4">{locs.editAuthor.lastName}</div>
            <div className="col-md-8">
              <input 
                name="lastName"
                type="text"
                className="form-control"
                required
                maxLength="20"
                value={this._getLastName()}
                onChange={this._valueChanged.bind(this)}
                >
              </input>
            </div>
          </div>

          <div className="row  author-input">
            <div className="col-md-4">{locs.editAuthor.firstName}</div>
            <div className="col-md-8">
              <input 
                name="firstName"
                type="text"
                className="form-control"
                required
                maxLength="20"
                value={this._getFirstName()}
                onChange={this._valueChanged.bind(this)}
                >
              </input>
            </div>
          </div>

          <div className="row author-controlls-buttons">
            <div className={`col-md-${this.props.author.authorId ? '8' : '10'}`}>
              <button type="submit" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
            </div>
            {this._getRemoveButton()}
            <div className="col-md-2">
              <Link to={`/books/${this.bookId}`}><button type="button" className="btn btn btn-info">{locs.common.cancel}</button></Link>
            </div>            
          </div>
        </form>
      </div>
    );
  }   
}

AddAuthor.propType = {
  author: PropTypes.object,
  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    author: state.authors.currentAuthor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (bookId, authorId) => {
      dispatch(actions.get(bookId, authorId));
    },
    save: (author, bookId) => {
      dispatch(actions.save(author, bookId));
    },
    remove: (bookId, authorId) => {
      dispatch(actions.remove(bookId, authorId));
    }
  };
};

const VisibleAddAuthor = connect(mapStateToProps, mapDispatchToProps)(AddAuthor);
export default VisibleAddAuthor;