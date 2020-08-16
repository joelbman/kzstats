import React from 'react'

interface Props {
  header: () => {}
  className?: string
}

const Panel: React.FC<Props> = (props) => {
  let classes = 'w-full bg-gray-800 h-auto border-2 border-black mr-4 '
  if (props.className) classes += props.className
  return (
    <div className={classes}>
      <div className="bg-gray-900 px-4 py-3 border-solid border-black border-b font-bold text-xl">
        {props.header()}
      </div>
      <div className="p-4">{props.children}</div>
    </div>
  )
}

export default Panel
