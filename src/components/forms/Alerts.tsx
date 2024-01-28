/* eslint-disable no-nested-ternary */
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'

type AlertType = {
  status: 'success' | 'error' | 'warning'
  title: string
  message: string
}

function Alert({ status = 'success', title, message }: AlertType) {
  const statusList = {
    success: {
      bg: 'bg-green-50',
      icon: 'text-green-400',
      title: 'text-green-800',
      body: 'text-green-700',
      IconComponent: CheckCircleIcon,
    },
    error: {
      bg: 'bg-red-50',
      icon: 'text-red-400',
      title: 'text-red-800',
      body: 'text-red-700',
      IconComponent: XCircleIcon,
    },
    warning: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      body: 'text-yellow-700',
      IconComponent: ExclamationTriangleIcon,
    },
  }

  let IconComponent = CheckCircleIcon

  if (status === 'error') IconComponent = XCircleIcon
  if (status === 'warning') IconComponent = ExclamationTriangleIcon

  return (
    <div className={`rounded-md ${statusList[status].bg} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent
            className={`h-5 w-5 ${statusList[status].icon}`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${statusList[status].title}`}>
            {title}
          </h3>
          <div className={`mt-2 text-sm ${statusList[status].body}`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert
