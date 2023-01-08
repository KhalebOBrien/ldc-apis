import { Request, Response, NextFunction } from 'express'
import { ErrorHelper } from '../middlewares'
import { StatusCodes } from 'http-status-codes'
import { UserProvider, WalletProvider, IUser, IWallet } from '../database'

interface IResgisterBodyProps extends Omit<IUser, 'id'> {}

export class WalletController {
    static fundWallet = async (req: Request, res: Response): Promise<Response> => {
        try {
          throw Error('invalid credentials')
        } catch (err) {
          const error = ErrorHelper.handle(err)
          return res.status(StatusCodes.UNAUTHORIZED).json({ error })
        }
      }
}