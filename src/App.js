import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import fpGroupBy from 'lodash/fp/groupBy';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css'
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import BookMessage from './BookMessage';

import {
  getAll,
} from './BooksAPI';

class BooksApp extends Component {
  state = {
    shelves: {},
    loading: false,
  };
  
  componentDidMount() {
    this._updateData();
  }

  _handleBookMove = ({ book, shelf, error }) => {
    this._updateData();
    toast(
      <BookMessage 
        book={book}
        shelf={shelf}
        type={error ? 'error' : 'success'}
      />, {
         type: error ? toast.TYPE.ERROR: toast.TYPE.SUCCESS
      });
  }

  _updateData = () => {
    this.setState({
      loading: true,
    });
    getAll()
      .then(fpGroupBy('shelf'))
      .then(shelves => this.setState({
        shelves,
        loading: false 
      }))
      .catch(() => alert('unable to load bookshelves'))
  }

  render() {
    const {
      shelves,
      loading,
    } = this.state;
    
    const commonProps = {
      onBookMove: this._handleBookMove,
      loading,
      shelves,
    };

    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => <MainPage {...commonProps} />}
          />
          <Route
            exact
            path="/search"
            render={() => <SearchPage {...commonProps} />}
          />
          <ToastContainer className="toast-container" />
        </div>
      </Router>
    )
  }
}

export default BooksApp
