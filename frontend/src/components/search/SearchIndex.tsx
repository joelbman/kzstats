import React from 'react'
import { Helmet } from 'react-helmet'
import MapNameSearch from './MapNameSearch'
import PlayerNameSearch from './PlayerNameSearch'
import SteamIDSearch from './SteamIDSearch'

interface Props {
  match: { params: { searchStr: string } }
}

const SearchIndex = (props: Props) => {
  if (!props.match.params.searchStr) return <div>Invalid search</div>
  return (
    <div>
      <Helmet title="Search" />
      <MapNameSearch searchStr={props.match.params.searchStr} />
      <PlayerNameSearch searchStr={props.match.params.searchStr} />
      <SteamIDSearch />
    </div>
  )
}

export default SearchIndex
