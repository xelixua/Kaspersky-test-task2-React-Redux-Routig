import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './controlls.component.css';
import locs from '../../constants/locs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/book.actions';
import uuidv4 from 'uuid/v4';

class Controlls extends Component {
  constructor(opts) {
    super(opts);
    const { sortByName, sortByYearPublished } = opts;
    this.sortByName = sortByName;
    this.sortByYearPublished = sortByYearPublished;
  }
  render() {
    return(
      <div className="row books-controlls">
        <Link to={`/books/book-${uuidv4()}`}><div className="col-md-1">&#43;</div></Link>
        <div className="col-md-2">{locs.controlls.sort}</div>
        <div onClick={this.sortByName} className="col-md-2"><a href="#">{locs.controlls.byName}</a></div>
        <div onClick={this.sortByYearPublished} className="col-md-2"><a href="#">{locs.controlls.byYearPublished}</a></div>
      </div>
    )
  }
}

Controlls.propType = {
  sortByName: PropTypes.func.isRequired,
  sortByYearPublished: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    sortByName: () => {
      dispatch(actions.sort('title'))
    },
    sortByYearPublished: () => {
      dispatch(actions.sort('yearPublished'))
    }
  };
};

const VisibleControlls = connect(() => {}, mapDispatchToProps)(Controlls);
export default VisibleControlls;
