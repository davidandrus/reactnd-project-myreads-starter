import React, { Component } from 'react';
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
    search(searchTermTrimmed, 20)
      .then(searchResults => {
        this.setState({
          searchResults: Array.isArray(searchResults)
            ? searchResults
            : [],
        });
      });

    //update({ id: "nggnmAEACAAJ" }, 'wantToRead').then(console.log);
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
          <a
            className="close-search" 
            onClick={() => this.setState({ showSearchPage: false })}
          >Close</a>
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
          {/*{JSON.stringify({searchResults})}*/}
          {showResultsMessage &&
            <p>{resultsMessage}</p>
          }
          <BooksGrid books={searchResults} />
        </div>
      </div>
    );
  }
}

export default SearchPage;