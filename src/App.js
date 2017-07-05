import React, { Component } from 'react'
import fpGroupBy from 'lodash/fp/groupBy';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './App.css'
import SearchPage from './SearchPage';
import MainPage from './MainPage';

import {
  getAll,
  update,
} from './BooksAPI';

class BooksApp extends Component {
  state = {
    shelves: {},
  };
  
  componentDidMount() {
    this._updateData();
  }

  _handleBookMove = ({ book, shelf }) => {
    update(book, shelf)
      .then(this._updateData)
      .catch(() => alert(`unable to move ${book.title}`))
  }

  _updateData = () => {
    getAll()
      .then(fpGroupBy('shelf'))
      .then(shelves => this.setState({ shelves }))
      .catch(() => alert('unable to load bookshelves'))
  }

  render() {
    const { shelves } = this.state;
    
    const commonProps = {
      onBookMove: this._handleBookMove,
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
        </div>
      </Router>
    )
  }
}

export default BooksApp
