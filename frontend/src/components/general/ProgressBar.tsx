import React, { useRef } from 'react'

interface Props {
  current: number
  max: number
  barColor: string
  label?: string
  textColor?: string
}

const ProgressBar = (props: Props) => {
  const percent = useRef((props.current * 100) / props.max)

  const barStyle = {
    width: `${percent.current}%`,
    background: props.barColor,
    textAlign: 'center' as const,
    color: props.textColor || '#fff',
    borderRadius: '7px',
    height: '100%',
  }

  return (
    <div className="w-48">
      {props.label && <h3>{props.label}</h3>}
      <div
        className="w-full h-7 text-center text-black bg-gray-400 overflow-hidden"
        style={{ borderRadius: '10px' }}
      >
        {percent.current < 23 && (
          <span className="absolute" style={{ marginLeft: '-12px' }}>
            {percent.current.toFixed(0)}%
          </span>
        )}
        <div style={barStyle} className="relative">
          <span className="p-1">
            {percent.current >= 23 ? (
              <span>{percent.current.toFixed(0)}%</span>
            ) : (
              ' '
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
