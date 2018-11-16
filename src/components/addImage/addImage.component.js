import React, { Component } from 'react';
import './addImage.component.css';
import locs from '../../constants/locs';

export default class AddImage extends Component {
  constructor(opts) {
    super(opts);
    opts.get(opts.match.params.bookId);
  }

  _handleFile() {

  }
  
  render() {
    return(
      <div>
        <div class="row">
          <div class="col-md-2">
            <button type="button" onClick={this._save()} class="btn btn-warning">loc.common.save</button>
          </div>
          <div class="col-md-2">
            <button type="button" onClick={this._cancel()} class="btn btn btn-info">loc.common.cancel</button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <image src={this.props.image}></image>
          </div>
          <div class="col-md-8">
            <input 
              type="file"
              accept="image/png, image/jpeg"
              onChange={this._handleFile}>
              </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <button type="button" onClick={this._save()} class="btn btn-warning">loc.common.save</button>
          </div>
          <div class="col-md-2">
            <button type="button" onClick={this._cancel()} class="btn btn btn-info">loc.common.cancel</button>
          </div>
        </div>
      </div>      
    )
  }
}