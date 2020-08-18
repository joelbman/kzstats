import React, { FunctionComponent } from 'react'

interface Props {
  headers?: string[]
  className?: string
}

const Table: FunctionComponent<Props> = (props) => {
  const classes = props.className
  return (
    <div className="overflow-x-auto w-full lg:w-3/4">
      <table className={classes}>
        {props.headers && (
          <thead>
            <tr className="bg-gray-900 text-left">
              {props.headers.map((content: string, i: number) => (
                <th className="odd:bg-gray-900" key={i}>
                  {content}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-gray-800 text-gray-300">{props.children}</tbody>
      </table>
    </div>
  )
}

export default Table
