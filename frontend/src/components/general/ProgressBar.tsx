import React, { ReactElement, useRef } from 'react'

interface Props {
  current: number
  max: number
  barColor: string
  label?: string | ReactElement
  textColor?: string
  info?: string
}

const ProgressBar = (props: Props) => {
  const percent = useRef((props.current * 100) / props.max)

  const barStyle = {
    width: `${percent.current}%`,
    background: props.barColor,
    textAlign: 'center' as const,
    color: props.textColor || '#fff',
    borderRadius: '10px',
    height: '100%',
  }

  return (
    <div className="w-48">
      {typeof props.label === 'string' ? <h3>{props.label}</h3> : props.label}
      <div
        className="w-full h-7 text-center border-2 border-black text-black bg-gray-400 overflow-hidden"
        style={{ borderRadius: '14px' }}
      >
        {percent.current < 23 && (
          <span className="absolute" style={{ marginLeft: '-17px' }}>
            {percent.current.toFixed(1)}%
          </span>
        )}
        <div style={barStyle} className="relative">
          <span className="p-1">
            {percent.current >= 23 ? (
              <span>{percent.current.toFixed(1)}%</span>
            ) : (
              ' '
            )}
          </span>
        </div>
      </div>
      {props.info && <span className="text-sm italic">{props.info}</span>}
    </div>
  )
}

export default ProgressBar
