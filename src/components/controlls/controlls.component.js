import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './controlls.component.css';
import locs from '../../constants/locs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions/book.actions';

class Controlls extends Component {
  render() {
    return(
      <div class="row">
        <Link to={'/books'}><div class="col-md-1">&#43;</div></Link>
        <div class="col-md-3">{locs.controlls.sort}</div>
        <div onClick={this.props.sortByName} class="col-md-3">{locs.controlls.byName}</div>
        <div onClick={this.props.sortByYearPublished} class="col-md-3">{locs.controlls.byYearPublished}</div>
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
      dispatch(actions.sort('name'))
    },
    sortByYearPublished: () => {
      dispatch(actions.sort('yearPublished'))
    }
  };
};

const VisibleControlls = connect(mapDispatchToProps)(Controlls);
export default VisibleControlls;
