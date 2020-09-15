import SearchInput from 'components/forms/SearchInput'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NavSearchBar = () => {
  const history = useHistory()
  const submitSearch = (value: string) => {
    if (value.length > 1) history.push('/search/' + value)
  }

  return (
    <div className="order-0 md:order-3 flex flex-grow border-gray-850 md:border-l-2 md:border-r-2 md:mx-4 md:px-4" style={{ maxWidth: '20rem', minWidth: 0 }}>
      <SearchInput placeholder="Map/player name, SteamID..." submit={submitSearch} height="31px" />
    </div>
  )
}

export default NavSearchBar
