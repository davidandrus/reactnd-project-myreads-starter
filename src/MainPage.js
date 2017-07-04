import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { getAll } from './BooksAPI';
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
              title="Currently Reading"
            />
            <BookShelf
              books={wantToRead}
              title="Want to Read"
            />
            <BookShelf
              books={read}
              title="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}