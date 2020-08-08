import React from 'react'

const ModeContext = React.createContext({
  modeCtxState: {
    kzMode: '',
    tickrate: '',
  },
  modeCtxDispatch: (mode: string, tickrate: string) => {},
})

export { ModeContext }
