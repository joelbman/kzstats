import React, { FunctionComponent } from 'react'

interface Props {
  headers?: string[]
  className?: string
}

const TableSimple: FunctionComponent<Props> = (props) => {
  const classes = props.className
  return (
    <div className="overflow-x-auto w-full">
      <table className={classes}>
        {props.headers && (
          <thead>
            <tr className="text-left">
              {props.headers.map((content: string, i: number) => (
                <th key={i}>{content}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>{props.children}</tbody>
      </table>
    </div>
  )
}

export default TableSimple
