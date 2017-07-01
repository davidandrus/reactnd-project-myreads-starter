import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import MainPage from './MainPage';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route
            exact
            path="/"
            component={MainPage}
          />
          <Route
            exact
            path="/search"
            component={SearchPage}
          />
        </div>
      </Router>
    )
  }
}

export default BooksApp
