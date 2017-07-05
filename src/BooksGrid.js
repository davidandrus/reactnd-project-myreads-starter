import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

export default function BooksGrid({ books, onBookMove }) {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book 
            book={book}
            onBookMove={onBookMove}
          />
        </li>
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onBookMove: PropTypes.func.isRequired,
};

BooksGrid.defaultProps = {
  books: [],
};