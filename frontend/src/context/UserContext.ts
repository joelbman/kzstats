import User from 'models/User'
import React from 'react'

interface State {
  user: User | null
  dispatch: (user: User | null) => void
}

const UserContext = React.createContext<State | undefined>(undefined)

export { UserContext }
