import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  // user = { name, classGrade (6-12), mode: 'scholar'|'explorer' }

  const login = (name, classGrade) => {
    const mode = classGrade <= 9 ? 'explorer' : 'scholar'
    setUser({ name, classGrade, mode })
  }

  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
