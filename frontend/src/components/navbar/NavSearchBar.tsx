import React, { useState } from 'react'

const NavSearchBar = () => {
  const [state, setState] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  return (
    <div className="order-0 md:order-4 lg:order-4 flex-grow lg:flex-initial border-black lg:border-l-2 lg:border-r-2 lg:ml-8 lg:pl-8 lg:mr-8 lg:pr-8">
      <input
        type="text"
        value={state}
        maxLength={20}
        onChange={handleChange}
        placeholder="Search maps, players..."
        className="p-2 border-black border-2 bg-gray-800 text-white rounded-lg w-full"
      />
    </div>
  )
}

export default NavSearchBar
