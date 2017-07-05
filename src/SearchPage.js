import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fpMap from 'lodash/fp/map';
import fpMapValues from 'lodash/fp/mapValues';
import fpGet from 'lodash/fp/get';

import BooksGrid from './BooksGrid';
import { search } from './BooksAPI';

const getObjectIds = fpMapValues(fpMap(fpGet('id')));

// @TODO - refactor in functional style
const getShelfForBook = (result, shelfIds) => {
  return Object.keys(shelfIds).find(shelfId => {
    // console.log({ ids: shelfIds[shelfId], resId: result.id })
    return shelfIds[shelfId].indexOf(result.id) > -1;
  }) || 'none';
}

// @TODO - only make sure most recent promise resolves
// @TODO - add loading indicator
// @TOOD - make sure books have correct shelf state
// @TODO - persist search term to history - MAYBE?

// @TODO - refactor in functional style
function getDoctoredResults(results, shelves) {
  const shelfIds = getObjectIds(shelves);

  console.log(results.map(result => ({
    ...result,
    shelf: getShelfForBook(result, shelfIds),
  })));

  return results.map(result => ({
    ...result,
    shelf: getShelfForBook(result, shelfIds),
  }));
}

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


    search(searchTermTrimmed, 20)
      .then(searchResults => {
        this.setState({
          searchResults: Array.isArray(searchResults)
            ? searchResults
            : [],
        });
      });
  }

  render() {
    const {
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

    const showResultsMessage = !searchResults.length
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