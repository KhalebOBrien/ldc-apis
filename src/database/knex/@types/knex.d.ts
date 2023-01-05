import { IUser, IWallet, ITransaction } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    user: IUser
    waller: IWallet
    transaction: ITransaction
  }
}
