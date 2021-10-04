import React from 'react'

interface Props {
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button className="flex justify-center items-center px-2 py-1 bg-gray-600 rounded-xl hover:bg-gray-650 hover:text-white" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
