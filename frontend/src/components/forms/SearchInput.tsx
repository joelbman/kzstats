import { SearchIcon } from 'components/icons'
import React, { useState } from 'react'

interface Props {
  placeholder?: string
  label?: string
  submit(value: string): void
  height: string
}

const SearchInput = (props: Props) => {
  const [value, setValue] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      props.submit(value)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form className="flex w-full items-center" style={{ minWidth: '2rem' }}>
      {props.label}
      <input
        placeholder={props.placeholder}
        className="flex-grow border border-black py-1"
        style={{ height: props.height, minWidth: '2rem' }}
        onKeyDown={onKeyDown}
        onChange={handleInput}
        minLength={2}
        maxLength={25}
        type="text"
      />
      <button
        className="bg-green-700 text-gray-200 border-black border w-7 p-1 px-2 focus:outline-none"
        style={{ height: props.height }}
        onClick={(e) => {
          e.preventDefault()
          props.submit(value)
        }}
      >
        <SearchIcon className="mr-0 w-4 h-4" />
      </button>
    </form>
  )
}

export default SearchInput
