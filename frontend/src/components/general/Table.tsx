import React, { FunctionComponent } from 'react'

interface Props {
  headers?: string[]
}

const Table: FunctionComponent<Props> = (props) => {
  return (
    <table className="w-full">
      {props.headers && (
        <thead>
          <tr className="bg-gray-900 text-left">
            {props.headers.map((content: string, i: number) => (
              <th key={i}>{content}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="bg-gray-800">{props.children}</tbody>
    </table>
  )
}

export default Table
