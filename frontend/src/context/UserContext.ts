import React from 'react'
import { User } from 'types'

interface State {
  user: User | null
  dispatch: (user: User | null) => void
}

const UserContext = React.createContext<State | undefined>(undefined)

export { UserContext }
