import { IUser, IWallet, ITransaction } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    users: IUser
    wallers: IWallet
    transactions: ITransaction
  }
}
