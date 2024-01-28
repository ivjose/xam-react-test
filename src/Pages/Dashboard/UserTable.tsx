import Table from '../../components/Table'
import { UserType } from '../../data/users_data'

function UserTable({ userList }: { userList: UserType[] }) {
  const columns = [
    {
      indexName: 'branchId',
      title: 'Branch ID',
    },
    {
      indexName: 'userName',
      title: 'User Name',
    },
    {
      indexName: 'firstName',
      title: 'Name',
      render: (data: UserType) => (
        <p>
          {data.firstName} {data.lastName}
        </p>
      ),
    },
    {
      indexName: 'position',
      title: 'Position',
    },
    {
      title: '',
      render: () => (
        <button
          type="button"
          onClick={() => alert('delete!')}
          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          Delete
        </button>
      ),
    },
  ]
  return (
    <Table
      title="User List"
      data={userList}
      columns={columns}
      rowKey="branchId"
    />
  )
}

export default UserTable
