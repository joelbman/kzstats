import React, { FunctionComponent } from 'react'

interface Props {
  headers: string[]
}

const Table: FunctionComponent<Props> = (props) => {
  return (
    <table className="w-full">
      <tbody className="bg-gray-800">
        <tr className="bg-gray-900 text-left">
          {props.headers.map((content: string, i: number) => (
            <th key={i}>{content}</th>
          ))}
        </tr>
        {props.children}
      </tbody>
    </table>
  )
}

export default Table
