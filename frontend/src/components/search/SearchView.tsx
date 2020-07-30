import React from 'react'
import { Helmet } from 'react-helmet'
import MapNameResults from './MapNameResults'
import PlayerNameResults from './PlayerNameResults'
import SteamIDResults from './SteamIDResults'

interface Props {
  match: { params: { searchStr: string } }
}

const SearchView = (props: Props) => {
  if (!props.match.params.searchStr) return <div>Invalid search</div>
  return (
    <div>
      <Helmet title="Search" />
      <MapNameResults searchStr={props.match.params.searchStr} />
      <PlayerNameResults searchStr={props.match.params.searchStr} />
      <SteamIDResults />
    </div>
  )
}

export default SearchView
