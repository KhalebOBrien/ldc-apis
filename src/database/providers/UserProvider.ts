import * as bcrypt from 'bcrypt'
import { ETableNames } from '../ETableNames'
import { IUser } from '../models'
import { Knex } from '../knex'

export class UserProvider {
  static create = async (data: Omit<IUser, 'id'>): Promise<any | Error> => {
    
    try {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(data.password, salt)

      const [result] = await Knex(ETableNames.users).insert({
        ...data,
        password: hashedPassword,
      })

      if (typeof result === 'object') {
        return result
      } else if (typeof result === 'number') {
        return result
      }

      return new Error(
        `Error while inserting record in ${ETableNames.users} table`,
      )
    } catch (error) {
      console.log(error)
      return new Error(
        `Caught error while inserting record in ${ETableNames.users} table`,
      )
    }
  }

  static findOneByEmail = async (email: string): Promise<IUser | Error> => {
    try {
      const result = await Knex(ETableNames.users)
        .select('*')
        .where('email', '=', email)
        .first()

      if (result) return result

      return new Error(`Record not Found in ${ETableNames.users} table`)
    } catch (error) {
      console.log(error)
      return new Error(
        `An error occured while searching for record in ${ETableNames.users} table`,
      )
    }
  }
}
