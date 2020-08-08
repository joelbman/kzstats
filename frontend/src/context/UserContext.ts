import User from 'models/User'
import React from 'react'

const UserContext = React.createContext({
  userCtx: {},
  userCtxDispatch: (user: User) => {},
})

export { UserContext }
