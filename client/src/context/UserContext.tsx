import React from 'react'
import { UserContextInterface } from '../interfaces/userInterface'

const UserContext = React.createContext<UserContextInterface>({
  user: null,
  setUser: () => {}
})

export default UserContext
