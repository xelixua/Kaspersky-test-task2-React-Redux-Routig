import React, { Component } from 'react';
import './addAuthor.component.css';
import locs from '../../constants/locs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/author.actions';

class AddAuthor extends Component {
  constructor(opts) {
    super(opts);
    opts.get(opts.match.params.bookId);
  }

  _getFirstName() {
    return this.props.firstName;
  }

  _getSecondName() {
    return this.props.secondName;
  }

  render() {
    return(
      <div>
        <div class="row">
          <div class="col-md-4">{locs.editAuthor.firstName}</div>
          <div class="col-md-8">
            <input 
              name="firstName"
              type="text"
              class="form-control"
              required
              maxlength="20"
              value={this._getFirstName()}
              >
            </input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">{locs.editAuthor.lastName}</div>
          <div class="col-md-8">
            <input 
              name="lastName"
              type="text"
              class="form-control"
              required
              maxlength="20"
              value={this._getSecondName()}
              >
            </input>
          </div>
        </div>
      </div>
    );
  }   
}

AddAuthor.propType = {
  author: PropTypes.object,
  get: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    author: state.authors.currentAuthor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get: (bookId) => {
      dispatch(actions.get(bookId));
    }
  };
};

const VisibleAddAuthor = connect(mapStateToProps, mapDispatchToProps)(AddAuthor);
export default VisibleAddAuthor;