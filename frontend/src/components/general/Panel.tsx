import React, { ReactElement } from 'react'

interface Props {
  header: string | ReactElement
  className?: string
}

const Panel: React.FC<Props> = (props) => {
  return (
    <div className={`panel ${props.className}`}>
      <div className="panel-header">{props.header}</div>
      <div className="p-4">{props.children}</div>
    </div>
  )
}

export default Panel
