import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import { search, update } from './BooksAPI';

class SearchPage extends Component {
  state = {
    searchTerm: '',
    resultsMessage: '',
    searchResults: [],
  };

  _handleSearchChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    const searchTermTrimmed = searchTerm.trim();
    this.setState({ searchTerm });

    // @TODO - only make sure most recent promise resolves
    // @TODO - add loading indicator
    // @TOOD - make sure books have correct shelf state
    search(searchTermTrimmed, 20)
      .then(searchResults => {
        this.setState({
          searchResults: Array.isArray(searchResults)
            ? searchResults
            : [],
        });
      });
  }

  _handleBookMove = ({ book, shelf }) => {
    // show error when failed;
    update(book, shelf)
  }

  render() {
    const {
      searchResults,
      searchTerm,
    } = this.state;

    const resultsMessage = searchTerm.trim()
      ? 'No Results Found for Query'
      : 'Enter a Search Query';

    const showResultsMessage = !searchResults.length

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search" 
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this._handleSearchChange}
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showResultsMessage &&
            <p>{resultsMessage}</p>
          }
          <BooksGrid
            books={searchResults}
            onBookMove={this._handleBookMove}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;