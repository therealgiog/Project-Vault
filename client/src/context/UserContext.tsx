import React from 'react'

type User = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  picturePath?: string;
  following?: string[];
  createdPosts?: string[];
}

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export default UserContext
