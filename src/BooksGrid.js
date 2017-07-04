import React from 'react';
import PropTypes from 'prop-types';

const getStyles = book => ({
  width: 128,
  height: 193,
  backgroundImage: `url("${book.imageLinks.thumbnail}")`,
  backgroundRepeat: 'no-repeat',
});

const getAuthors = authors => authors.join(', ');

// @TODO - handle the different size image thumbnails
export default function BooksGrid({ books }) {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={getStyles(book)}
              />
              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{getAuthors(book.authors)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

BooksGrid.defaultProps = {
  books: [],
};