import { ETableNames } from '../ETableNames'
import { IWallet } from '../models'
import { Knex } from '../knex'

export class WalletProvider {
  static create = async (data: Pick<IWallet, 'user_id'|'amount'>): Promise<number | Error> => {
    try {
      const [result] = await Knex(ETableNames.wallets)
        .insert({
          ...data,
        })

      if (typeof result === 'object') {
        return result
      } else if (typeof result === 'number') {
        return result
      }

      return new Error(
        `Error while inserting record in ${ETableNames.wallets} table`,
      )
    } catch (error) {
      console.log(error)
      return new Error(
        `Caught error while inserting record in ${ETableNames.wallets} table`,
      )
    }
  }

  static updateWallet = async (data: Pick<IWallet, 'user_id'|'amount'>): Promise<void | Error> => {
    try {
      const result = await Knex(ETableNames.wallets)
      .update(data)
      .where('id', '=', data.user_id);

      if (result > 0) return;

      return new Error(`Record not Found in ${ETableNames.wallets} table`)
    } catch (error) {
      console.log(error)
      return new Error(
        `An error occured while searching for record in ${ETableNames.wallets} table`,
      )
    }
  }

  static findOneByUserId = async (userId: number): Promise<IWallet | Error> => {
    try {
      const result = await Knex(ETableNames.wallets)
        .select('*')
        .where('user_id', '=', userId)
        .first()

      if (result) return result

      return new Error(`Record not Found in ${ETableNames.wallets} table`)
    } catch (error) {
      console.log(error)
      return new Error(
        `An error occured while searching for record in ${ETableNames.wallets} table`,
      )
    }
  }
}
