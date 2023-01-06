import { IUser } from '../../database'
import * as yup from 'yup'
import { validator } from './Validator'

interface IBodyProps extends Omit<IUser, 'id' | 'created_at' | 'updated_at'> {}

export const signUpValidation = validator((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      last_name: yup.string().required().min(3),
      other_name: yup.string().required().min(3),
      phone_number: yup.string().required().min(6),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
  ),
}))
