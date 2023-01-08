import { IUser , IUserLogin} from '../../database'
import * as yup from 'yup'
import { validator } from './Validator'

interface IRegisterBodyProps extends Omit<IUser, 'id' | 'created_at' | 'updated_at'> {}
interface ILoginBodyProps extends IUserLogin {}

export class Validation {
  static signUpValidation = validator((getSchema) => ({
    body: getSchema<IRegisterBodyProps>(
      yup.object().shape({
        last_name: yup.string().required().min(3),
        other_name: yup.string().required().min(3),
        phone_number: yup.string().required().min(6),
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(8),
      }),
    ),
  }))

  static loginValidation = validator((getSchema) => ({
    body: getSchema<ILoginBodyProps>(
      yup.object().shape({
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(8),
        remember_me: yup.boolean().required()
      }),
    ),
  }))

}
