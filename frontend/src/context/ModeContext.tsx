import React from 'react'

const ModeContext = React.createContext({
  modeContextState: { kzMode: 'kz_timer', tickrate: '128' },
  modeContextDispatch: (mode: string, tickrate: string) => {},
})

export { ModeContext }
