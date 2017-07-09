import React from 'react';
import PropTypes from 'prop-types';

export default function BookMessage({ book, shelf, type }) {
  return (
    <div className="book-toast">
      <div className="book-toast-image-wrapper">
        <img
          className="book-toast-image"
          src={book.imageLinks.thumbnail}
          width={50}
        />
      </div>
        <p>
          <strong>{book.title}</strong> 
          {type === 'success'
            ? 'Successfully moved to '
            : 'Could not be moved to '
          }
          <strong>{shelf}</strong>
        </p>
      }
    </div>
  )
};


BookMessage.propTypes = {
  book: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  shelf: PropTypes.node,
}

BookMessage.defaultProps = {
  type: 'success',
};
