import { ReactElement } from 'react'

type ColumnProps<T> = {
  indexName?: string
  title: string
  render?: (item: T) => ReactElement
}

interface TableProps<T> {
  data: T[]
  columns: ColumnProps<T>[]
  rowKey: string
  title: string
}

function Table<T>({ data, columns, rowKey, title }: TableProps<T>) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={`${column.indexName}`}
                        scope="col"
                        className={`text-left text-sm font-semibold ${index === 0 ? 'py-3.5 pl-4 pr-3 sm:pl-6 text-gray-90 ' : 'px-3 py-3.5 text-gray-900 '}`}
                      >
                        {column.title}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((item) => (
                    <tr key={`${item[`${rowKey}` as keyof typeof item]}`}>
                      {columns.map((column, index) => (
                        <td
                          key={`${column.indexName}`}
                          className={`whitespace-nowrap py-4 text-sm font-medium  ${index === 0 ? 'pl-4 pr-3 sm:pl-6 text-gray-900' : ' px-3 text-gray-500'}`}
                        >
                          {column.render
                            ? column.render(item)
                            : (item[
                                column.indexName as keyof typeof item
                              ] as string)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
