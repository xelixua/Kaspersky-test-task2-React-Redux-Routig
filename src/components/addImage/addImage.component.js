import React, { Component } from 'react';
import locs from '../../constants/locs';
import './addImage.component.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import actions from '../../actions/image.actions';
import { connect } from 'react-redux';

class AddImage extends Component {
  constructor(opts) {
    super(opts);
    const { get, save, showImage, remove, match: { params: { bookId } } } = opts;
    this.bookId = bookId;
    this.save = save;
    this.remove = remove;
    this.showImage = showImage;
    get(bookId);
  }

  _save(event) {
    event.preventDefault();
    console.log('save function');
    this.save(this.bookId, this.props.image);
    window.location.replace(`/books/${this.bookId}`);
  }

  _handleFile(event) {
    event.preventDefault();
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      console.log('result', fileReader.result);
      this.showImage(fileReader.result);
    };
    fileReader.readAsDataURL(event.target.files[0]);
  }

  _remove(event) {
    event.preventDefault();
    this.remove(this.bookId);
    window.location.replace(`/books/${this.bookId}`);
  }
  
  render() {
    return(
      <div>
        <h1>{locs.editImage.header}</h1>
        <div className="row image-controlls-buttons">
          <div className="col-md-6">
            <button type="button" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
          </div>
          <div className="col-md-2">
            <button type="button" onClick={this._remove.bind(this)} className="btn btn-warning">{locs.common.remove}</button>
          </div>
          <div className="col-md-2">
            <Link to={`/books/${this.bookId}`}><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.cancel}</button></Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <img src={this.props.image} className="book-thumbnail"></img>
          </div>
          <div className="col-md-8">
            <input 
              type="file"
              accept="image/png, image/jpeg"
              onChange={this._handleFile.bind(this)}>
              </input>
          </div>
        </div>

        <div className="row image-controlls-buttons">
          <div className="col-md-6">
            <button type="button" onClick={this._save.bind(this)} className="btn btn-warning">{locs.common.save}</button>
          </div>
          <div className="col-md-2">
            <button type="button" onClick={this._remove.bind(this)} className="btn btn-warning">{locs.common.remove}</button>
          </div>
          <div className="col-md-2">
            <Link to={`/books/${this.bookId}`}><button type="button" onClick={this._cancel} className="btn btn btn-info">{locs.common.cancel}</button></Link>
          </div>
        </div>
      </div>      
    )
  }
}

AddImage.propType = {
  get: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    image: state.images.currentImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (bookId) => {
      dispatch(actions.get(bookId));
    },
    save: (bookId, image) => {
      dispatch(actions.save(bookId, image));
    },
    showImage: (base64Image) => {
      dispatch(actions.showImage(base64Image));
    },
    remove: (bookId) => {
      dispatch(actions.remove(bookId));
    }
  };
};

const VisibleAddImage = connect(mapStateToProps, mapDispatchToProps)(AddImage);
export default VisibleAddImage;