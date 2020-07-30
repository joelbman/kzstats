import React, { FunctionComponent } from 'react'

interface Props {
  headers: string[]
}

const Table: FunctionComponent<Props> = (props) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-900 text-left">
        {props.headers.map((content: string) => (
          <th>{content}</th>
        ))}
      </thead>
      <tbody className="bg-gray-800">{props.children}</tbody>
    </table>
  )
}

export default Table
