import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// blocks
import SearchForm from '@/blocks/SearchForm'
import ResultList from '@/blocks/ResultList'
import NoResultFound from '@/blocks/ResultNotFound'

// hooks
import useFetch from '@/hooks/useFetch'

// utils
import { API_URL } from '@/utils'

function SearchResults() {
  const [searchParams] = useSearchParams()

  const q = searchParams.get('q')

  const [query, setQuery] = useState(q || '')

  const [isResultShown, setResultShown] = useState(false);

  const { response: searchResults = [] } = useFetch(
    `${API_URL}/search?searchTerm=${query}`
  )

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
       setResultShown(true);
    } else {
      setResultShown(false)
    }
  }

  console.log('dd', isResultShown)
  return (
    <>
      <SearchForm
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={(e) => {
          event.preventDefault();
          setQuery('');
        }}
        //onKeyDown={handleSearch}
        //onSearch={handleSearch}
      />

      { searchResults.length ? (
       <ResultList query={query} data={searchResults} />
     ) : (
       <NoResultFound searchText={q} />
     )}

    </>
  )
}

export default SearchResults
