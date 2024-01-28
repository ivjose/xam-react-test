import { useForm } from 'react-hook-form'

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Alerts from '../../components/Alerts'
import Input from '../../components/forms/Input'
import { useAuth } from '../../context/AuthContext'

import { users, UserType } from '../../data/users_data'

type LoginFieldType = Pick<UserType, 'branchId' | 'password' | 'userName'>

type LoginFieldKeys = keyof LoginFieldType

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserType>()

  const [apiErrors, setApiErrors] = useState<string | null>(null)

  const onSubmit = async (value: UserType) => {
    setApiErrors(null)
    const keyChecker = Object.keys(value) as LoginFieldKeys[]

    await new Promise<void>((resolve) => {
      const validateUser = users.find((user) =>
        keyChecker.every((keyName) => {
          return keyName === 'branchId'
            ? user[keyName] === Number(value[keyName])
            : user.userName === value.userName
          // : user[keyName] === value[keyName]
        })
      )

      setTimeout(async () => {
        if (validateUser) {
          if (validateUser.password === value.password) {
            auth.login(validateUser, () => navigate(from, { replace: true }))
            reset()
          } else {
            setApiErrors('Password is incorrect')
          }
          resolve()
        } else {
          resolve()
          setApiErrors('User not found')
        }
      }, 3000)
    })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-200">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="py-6  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2 space-y-4 mb-4"
          >
            <Input
              id="branchId"
              label="Branch ID"
              register={register}
              rule={{
                required: 'Branch ID is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please enter a number',
                },
              }}
              error={errors.branchId?.message?.toString()}
            />
            <Input
              id="userName"
              label="User Name"
              register={register}
              rule={{ required: 'User Name is required' }}
              error={errors.userName?.message?.toString()}
            />
            <Input
              id="password"
              label="Password"
              register={register}
              rule={{ required: 'Password is required' }}
              error={errors.password?.message?.toString()}
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${isSubmitting ? 'bg-gray-400 focus-visible:outline-gray-400' : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'}`}
            >
              Submit
            </button>
          </form>
          {apiErrors && (
            <Alerts status="error" title="Oh Snap" message={apiErrors} />
          )}
        </div>
      </div>
    </div>
  )
}
