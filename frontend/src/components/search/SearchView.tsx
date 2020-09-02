import React from 'react'
import { Helmet } from 'react-helmet'
import MapNameResults from './MapNameResults'
import PlayerNameResults from './PlayerNameResults'

interface Props {
  match: { params: { searchStr: string } }
}

const SearchView = (props: Props) => {
  if (!props.match.params.searchStr) return <div>Invalid search</div>
  return (
    <div>
      <h1>Search</h1>
      <Helmet title="Search" />
      <div className="flex">
        <MapNameResults searchStr={props.match.params.searchStr} />
        <PlayerNameResults searchStr={props.match.params.searchStr} />
      </div>
    </div>
  )
}

export default SearchView
