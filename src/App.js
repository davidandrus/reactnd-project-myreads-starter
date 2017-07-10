import React, { Component } from 'react';
import fpGroupBy from 'lodash/fp/groupBy';
import cloneDeep from 'lodash/cloneDeep';
import mapValues from 'lodash/mapValues';

import {
  ToastContainer,
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  /**
   * would normally user BrowserRouter, 
   * but to get to work on gh-pages will use has router
   */ 
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css'
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import BookMessage from './BookMessage';

import { getAll } from './BooksAPI';

class BooksApp extends Component {
  state = {
    shelves: {},
    loading: false,
  };
  
  componentDidMount() {
    this._fetchData();
  }

  _handleBookMove = ({ book, shelf, error }) => {

    // only refresh data if the move call is successful, otherwise no update needed
    if (!error) {
      this._updateData({ book, shelf });
    }

    toast(
      <BookMessage 
        book={book}
        shelf={shelf}
        type={error ? 'error' : 'success'}
      />, {
         type: toast.TYPE[error ? 'ERROR' : 'SUCCESS'],
      });
  }

  _updateData = ({ book, shelf }) => {
    // clone shelves and remove the added book from existing shelves if found
    const shelvesClone = mapValues(
      cloneDeep(this.state.shelves),
      books => books.filter(shelfBook => book.id !== shelfBook.id),
    );
    
    this.setState({
      shelves: {
        ...shelvesClone,
        [shelf]: [...shelvesClone[shelf], book],
      },
    });
  }

  _fetchData = () => {
    this.setState({ loading: true });
    getAll()
      .then(fpGroupBy('shelf'))
      .then(shelves => this.setState({
        shelves,
        loading: false,
      }))
      .catch(() => {
        toast(
          <h2>There was an error loading your bookshelves, try again by hitting refresh in your browser.</h2>
          , { autoClose: false }
        )
      })
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
