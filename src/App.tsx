import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { AuthContextType, useAuth } from './context/AuthContext'

import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'

import { fakeAuthProvider } from './auth'

async function routLoader(auth: AuthContextType) {
  const user = localStorage.getItem('user')
  if (user && !fakeAuthProvider.isAuthenticated) {
    auth.login(JSON.parse(user), () => {})
  }
  return null
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect('/')
  }
  return null
}

function protectedLoader() {
  if (!fakeAuthProvider.isAuthenticated) {
    return redirect('/login?')
  }
  return null
}

export default function App() {
  const auth = useAuth()

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          id: 'root',
          path: '/',
          loader: () => routLoader(auth),
          children: [
            {
              index: true,
              Component: Dashboard,
              loader: protectedLoader,
            },
            {
              path: '/login/',
              loader: () => loginLoader(),
              Component: Login,
            },
          ],
        },
        {
          path: '/logout',
          loader() {
            auth.logout(() => {})
            return redirect('/login')
          },
        },
      ])}
      fallbackElement={<p>Initial Load...</p>}
    />
  )
}
