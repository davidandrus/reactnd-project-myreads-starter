import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';



function BookShelf({ title, books, onBookMove }) {
  if (!books.length) { return null; }

  return (
     <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          onBookMove={onBookMove}
        />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: BooksGrid.propTypes.books,
  title: PropTypes.string.isRequired,
};

BookShelf.defaultProps = {
  books: [],
};

export default BookShelf;