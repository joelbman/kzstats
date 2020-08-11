import React from 'react'

const ModeContext = React.createContext({
  state: {
    kzMode: '',
    tickrate: '',
  },
  dispatch: (mode: string, tickrate: string) => {},
})

export { ModeContext }
