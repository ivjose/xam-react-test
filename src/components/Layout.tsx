import { ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

function Layout({ children }: { children: React.ReactNode }) {
  const auth = useAuth()

  const { userName } = auth.user || { userName: '' }
  return (
    <div>
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 bg-gray-800">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" />
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <strong className="text-white leading-6 text-xl">
                {userName}
              </strong>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
            <Link
              to="/logout"
              className="relative inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600"
            >
              <ArrowRightCircleIcon
                className="-ml-0.5 h-5 w-5"
                aria-hidden="true"
              />
              Logout
            </Link>
          </div>
        </div>
      </div>
      <main className="pt-12 pb-8 bg-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
