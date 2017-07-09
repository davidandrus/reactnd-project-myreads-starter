import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fpMap from 'lodash/fp/map';
import fpMapValues from 'lodash/fp/mapValues';
import fpGet from 'lodash/fp/get';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import find from 'lodash/find';

import BooksGrid from './BooksGrid';
import { search } from './BooksAPI';

const getObjectIds = fpMapValues(fpMap(fpGet('id')));

const getShelfForBook = (result, shelfIds) => 
  find(
    keys(shelfIds), 
    shelfId => includes(shelfIds[shelfId], result.id)
  ) || 'none';

// @TODO - persist search term to history - MAYBE?
function getDoctoredResults(results, shelves) {
  const shelfIds = getObjectIds(shelves);

  return results.map(result => ({
    ...result,
    shelf: getShelfForBook(result, shelfIds),
  }));
}

class SearchPage extends Component {
  state = {
    // for testing
    loading: false,
    searchTerm: '',
    resultsMessage: '',
    searchResults: [],
  };

  _handleSearchChange = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    const searchTermTrimmed = searchTerm.trim();
    this.setState({
      searchTerm,
      loading: true,
      ...!searchTermTrimmed && {
        loading: false,
        searchResults: [],
      },
    });

    // only fetch if there is a searchTerm
    if (!searchTermTrimmed) { return; }

    search(searchTermTrimmed, 100)
      .then(searchResults => {

        // only resolve promise for the current searchTerm
        if (this.state.searchTerm.trim() !== searchTermTrimmed) {
          return;
        }
        this.setState({
          loading: false,
          searchResults: Array.isArray(searchResults)
            ? searchResults
            : [],
        });
      });
  }

  render() {
    const {
      loading,
      searchResults,
      searchTerm,
    } = this.state;

    const {
      onBookMove,
      shelves,
    } = this.props;

    const resultsMessage = searchTerm.trim()
      ? 'No Results Found for Query'
      : 'Enter a Search Query';

    const showResultsMessage = !searchResults.length && !loading;
    const doctoredResults = getDoctoredResults(searchResults, shelves);

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
          {loading && <div className="loader" />}
          <BooksGrid
            books={doctoredResults}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;