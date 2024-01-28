import { InputHTMLAttributes } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  register: UseFormRegister<FieldValues>
  rule?: RegisterOptions<FieldValues>
  error?: string
}

function Input({ label, register, id, rule, error, ...rest }: InputProps) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id={id}
            className={`block w-full rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${error ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 ' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600'}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="email-error"
            {...(error && { 'aria-describedby': `${id}-error` })}
            {...register(id, { ...rule })}
            {...rest}
          />
        </div>

        {error && (
          <p
            className="mt-2 text-sm text-red-600"
            id={`${id}-error`}
          >{`${error}`}</p>
        )}
      </div>
      {/* <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...register(id, { ...rule })} {...rest} />
      {error && <p className="text-red-500">{`${error}`}</p>} */}
    </>
  )
}

export default Input
