import SearchInput from 'components/general/SearchInput'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NavSearchBar = () => {
  const history = useHistory()
  const submitSearch = (value: string) => {
    history.push('/search/' + value)
  }

  return (
    <div className="order-0 md:order-4 flex-grow border-gray-850 md:border-l-2 md:border-r-2 md:ml-4 md:pl-4 md:mr-4 md:pr-4">
      <SearchInput
        placeholder="Search maps, players..."
        submit={submitSearch}
        height="31px"
      />
    </div>
  )
}

export default NavSearchBar
