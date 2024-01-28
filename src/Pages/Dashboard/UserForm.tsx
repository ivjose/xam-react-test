import { useForm } from 'react-hook-form'
import { UserType } from '../../data/users_data'

import Input from '../../components/forms/Input'

type UserFormType = {
  formSubmit: (values: UserType) => void
  userList: UserType[]
}

function UserForm({ formSubmit, userList }: UserFormType) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<UserType>()

  const onSubmit = async (values: UserType) => {
    await new Promise<void>((resolve) => {
      const validateUser = userList.some(
        (user) => user.branchId === Number(values.branchId)
      )

      setTimeout(async () => {
        if (validateUser) {
          setError('branchId', {
            type: 'manual',
            message: 'Duplicate Branch ID',
          })
        } else {
          formSubmit({ ...values, branchId: Number(values.branchId) })
        }
        resolve()
      }, 3000)
    })
  }

  const handleReset = () => {
    reset({
      branchId: '',
      userName: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      position: '',
    })
  }

  return (
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
      <Input
        id="firstName"
        label="First Name"
        register={register}
        rule={{ required: 'First Name is required' }}
        error={errors.firstName?.message?.toString()}
      />

      <Input
        id="middleName"
        label="Middle Name"
        register={register}
        rule={{ required: 'Middle Name is required' }}
        error={errors.middleName?.message?.toString()}
      />

      <Input
        id="lastName"
        label="Last Name"
        register={register}
        rule={{ required: 'Last Name is required' }}
        error={errors.lastName?.message?.toString()}
      />
      <Input
        id="position"
        label="position"
        register={register}
        rule={{ required: 'Position is required' }}
        error={errors.position?.message?.toString()}
      />

      <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0 justify-end">
        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleReset}
          className={`inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   ${isSubmitting ? 'bg-gray-200 hover:bg-gray-200' : 'bg-white hover:bg-gray-50 '}`}
        >
          Reset
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`ml-3 inline-flex items-center rounded-md   px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${isSubmitting ? 'bg-gray-400 focus-visible:outline-gray-400' : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'}`}
        >
          Add User
        </button>
      </div>
    </form>
  )
}

export default UserForm
