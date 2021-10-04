import { SearchIcon } from 'components/icons'
import React, { useState } from 'react'

interface Props {
  placeholder?: string
  label?: string
  submit(value: string): void
  height: string
  value?: string
}

const SearchInput = (props: Props) => {
  const [value, setValue] = useState(props.value || '')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return
    }

    e.preventDefault()
    e.stopPropagation()
    props.submit(value)
  }

  return (
    <form className="flex w-full items-center" style={{ minWidth: '2rem' }}>
      {props.label}
      <input
        placeholder={props.placeholder}
        className="flex-grow border border-black py-1"
        style={{ height: props.height, minWidth: '2rem' }}
        onKeyDown={onKeyDown}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        minLength={2}
        maxLength={25}
        type="text"
      />
      <button
        className="bg-green-700 text-gray-200 border-black border w-8 p-1 px-2 focus:outline-none"
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
