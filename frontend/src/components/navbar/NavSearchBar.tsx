import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const NavSearchBar = () => {
  const history = useHistory()
  const [state, setState] = useState('')

  const submitSearch = () => {
    history.push('/search/' + state)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      submitSearch()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  return (
    <div className="order-0 md:order-4 flex-grow border-gray-850 md:border-l-2 md:border-r-2 md:ml-4 md:pl-4 md:mr-4 md:pr-4">
      <input
        type="text"
        value={state}
        maxLength={20}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        placeholder="Search maps, players..."
        className="p-1 pl-2 pr-2 border-black border-2 bg-gray-800 text-white rounded-lg w-full"
      />
    </div>
  )
}

export default NavSearchBar
