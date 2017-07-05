import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';
import { getAll, update } from './BooksAPI';
import fpGroupBy from 'lodash/fp/groupBy';

export default class MainPage extends Component {

  state = {
    shelves: {},
  };
  
  componentDidMount() {
    // @TODO - handle error somehow
    getAll()
      .then(fpGroupBy('shelf'))
      .then(shelves => this.setState({ shelves }))
  }

  _handleBookMove = ({ book, shelf }) => {
    // @TODO - make sure page is refreshed when book is added
    update(book, shelf)
  }

  render() {
    const {
      shelves: {
        currentlyReading,
        read,
        wantToRead,
      },
    } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              books={currentlyReading}
              onBookMove={this._handleBookMove}
              title="Currently Reading"
            />
            <BookShelf
              books={wantToRead}
              onBookMove={this._handleBookMove}
              title="Want to Read"
            />
            <BookShelf
              books={read}
              onBookMove={this._handleBookMove}
              title="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}