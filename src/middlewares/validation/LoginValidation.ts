import { IUser } from '../../database'
import * as yup from 'yup'
import { validator } from './Validator'

interface IBodyProps extends Pick<IUser, 'email' | 'password'> {}

export const loginValidation = validator((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
  ),
}))
