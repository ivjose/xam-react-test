import { useState } from 'react'

import Layout from '../../components/Layout'

import { users, UserType } from '../../data/users_data'

import UserForm from './UserForm'
import UserTable from './UserTable'

function Dashboard() {
  const [userList, setUserList] = useState<UserType[]>([...users])

  const handleSubmit = (values: UserType) => {
    setUserList((prevUserList) => [...prevUserList, values])
  }

  const handleDeleteUser = (value: UserType) => {
    console.log(value, 'DSSSS')

    setUserList((current) =>
      current.filter((user) => user.branchId !== value.branchId)
    )
  }
  console.log(handleSubmit)

  return (
    <Layout>
      <h1 className="sr-only">Page title</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
            <h2 className="sr-only" id="section-2-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <UserForm formSubmit={handleSubmit} userList={userList} />
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
            <h2 className="sr-only" id="section-1-title">
              Section title
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6">
                <UserTable
                  userList={userList}
                  handleDelete={handleDeleteUser}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
