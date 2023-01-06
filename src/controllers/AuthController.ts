import { Request, Response, NextFunction } from 'express'
import { JwtHandler, ErrorHelper } from '../middlewares'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { UserProvider, WalletProvider, IUser, IWallet } from '../database'
import { number } from 'yup'

interface IBodyProps extends Omit<IUser, 'id'> {}

export class AuthController {
  static register = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response,
  ): Promise<Response> => {
    try {
      const userId = await UserProvider.create(req.body)
      if (typeof userId == 'number') {
        // create user wallet
        const walletData: Pick<IWallet, 'user_id'|'amount'> = {user_id:userId, amount:0.0}
        const wallet = await WalletProvider.create(walletData)

        const userObj: Partial<IUser> = { ...req.body, id: userId }
        delete userObj.password

        const token = JwtHandler.createToken({
          user_id: userId,
          email: userObj.email || req.body.email,
          remember_me: false,
        })

        return res.status(StatusCodes.CREATED).json({ user: userObj, token })
      }
      return res.status(StatusCodes.BAD_REQUEST)
    } catch (err) {
      const error = ErrorHelper.handle(err)
      return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
  }

  static login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, remember_me } = req.body
    try {
      const user: IUser | Error = await UserProvider.findOneByEmail(email)
      if (user instanceof Error) {
        throw Error('invalid credentials')
      }

      if (user.password) {
        const correctPwd: Boolean = await bcrypt.compare(
          password,
          user.password,
        )
        if (correctPwd) {
          const token: any = JwtHandler.createToken({
            user_id: user.id,
            email: user.email,
            remember_me: remember_me,
          })

          const userObj: Partial<IUser> = { ...user }
          delete userObj.password
          return res.status(StatusCodes.OK).json({ user: userObj, token })
        }
      }
      // failed credentials
      throw Error('invalid credentials')
    } catch (err) {
      const error = ErrorHelper.handle(err)
      return res.status(StatusCodes.UNAUTHORIZED).json({ error })
    }
  }
}
