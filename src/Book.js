import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { update } from './BooksAPI';

const getStyles = book => ({
  backgroundImage: `url("${book.imageLinks.thumbnail}")`,
});

const getAuthors = authors => authors.join(', ');

export default class Book extends Component {
  
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookMove: PropTypes.func.isRequired,
  }

  state = {
    moving: false,
  }

  _handleBookMove = (e) => {
    const {
      book,
      onBookMove,
    } = this.props;

    const shelf = e.target.value;
    this.setState({ moving: true })
    
    update(book, shelf)
      .then(() => {
        this.setState({ moving: false }, () => {
          onBookMove({
            shelf,
            book,
          });
        })
      })
      .catch(() => alert(`unable to move ${book.title}`))
  }

  render() {
    const { book } = this.props;
    const { moving } = this.state;
    const changerClassName = `book-shelf-changer${moving ? ' loading' : ''}`;

    return (
      <div className="book">
        <div className="book-top">
        <div
          className="book-cover"
          style={getStyles(book)}
        />
          <div className={changerClassName}>
            <select
              disabled={moving}
              onChange={this._handleBookMove}
              value={book.shelf}
            >
              <option disabled>Move to...</option>
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
    );
  }
}

