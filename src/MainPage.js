import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

export default function MainPage({
  shelves: {
    currentlyReading,
    read,
    wantToRead,
  },
  onBookMove,
  loading,
}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {loading 
        ? <div className="loading" />
        : <div className="list-books-content">
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
      }
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  shelves: PropTypes.object,
  onBookMove: PropTypes.func,
  loading: PropTypes.bool,
};