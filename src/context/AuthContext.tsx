import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { fakeAuthProvider } from '../auth'

import { UserType } from '../data/users_data'

export interface AuthContextType {
  user?: UserType | null
  login: (user: UserType, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType | null>(null)

  const login = useCallback((newUser: UserType, callback: VoidFunction) => {
    return fakeAuthProvider.login(() => {
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      callback()
    })
  }, [])

  const logout = useCallback(
    (callback: VoidFunction) => {
      return fakeAuthProvider.logout(() => {
        setUser(null)
        localStorage.removeItem('user')
        const userData = localStorage.getItem('user')
        console.log(userData, 'logoutTEST!')
        callback()
      })
    },

    []
  )

  useEffect(() => {
    const userData = localStorage.getItem('user')
    console.log('OMCE!')

    if (userData && !fakeAuthProvider.isAuthenticated) {
      fakeAuthProvider.login(() => {
        setUser(JSON.parse(userData))
      })
    }
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
