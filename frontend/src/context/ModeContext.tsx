import React from 'react'

const ModeContext = React.createContext({
  modeContextState: {
    kzMode: '',
    tickrate: '',
  },
  modeContextDispatch: (mode: string, tickrate: string) => {},
})

export { ModeContext }
