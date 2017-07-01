import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

function BookShelf({ title }) {
  return (
     <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BookShelf;