import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fpGroupBy from 'lodash/fp/groupBy';

import BookShelf from './BookShelf';
import {
  getAll,
  update,
} from './BooksAPI';


export default function MainPage({
  shelves: {
    currentlyReading,
    read,
    wantToRead,
  },
  onBookMove,
}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf 
            books={currentlyReading}
            onBookMove={onBookMove}
            title="Currently Reading"
          />
          <BookShelf
            books={wantToRead}
            onBookMove={onBookMove}
            title="Want to Read"
          />
          <BookShelf
            books={read}
            onBookMove={onBookMove}
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