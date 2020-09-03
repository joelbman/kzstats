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
    <div className="my-4">
      <h2>Error</h2>
      {props.local ? (
        <p>This error occured on the KZStats backend.</p>
      ) : (
        <p>This error occured on the Global API.</p>
      )}
      <p>Message: {props.message}</p>
    </div>
  )
}

export default ErrorHandler
