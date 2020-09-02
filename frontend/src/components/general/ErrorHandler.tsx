import React from 'react'

interface Props {
  message?: string
  type?: number
  local?: boolean
}

const ErrorHandler = (props: Props) => {
  if (props.type === 404)
    return (
      <div>
        <h1>404</h1> The requested resource was not found.
      </div>
    )

  return (
    <div className="w-full block bg-red-900">
      <div className="bg-red-700 border border-bottom border-black">
        <h2>Error</h2>
      </div>
      <div className="p-4">
        {props.local ? (
          <p>This error occured on the KZStats backend.</p>
        ) : (
          <p>This error occured on the Global API.</p>
        )}
        <p>Message: {props.message}</p>
      </div>
    </div>
  )
}

export default ErrorHandler
