import { Request, Response, NextFunction } from 'express'
import { JwtHandler, ErrorHelper } from '../middlewares'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import { UserProvider, WalletProvider, IUser, IWallet, IUserLogin } from '../database'

interface IResgisterBodyProps extends Omit<IUser, 'id'> {}
interface ILoginBodyProps extends IUserLogin {}

export class AuthController {
  static register = async (
    req: Request<{}, {}, IResgisterBodyProps>,
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

  static login = async (req: Request<{}, {}, ILoginBodyProps>, res: Response): Promise<Response> => {
    try {
      const user: IUser | Error = await UserProvider.findOneByEmail(req.body.email)
      if (user instanceof Error) {
        throw Error('invalid credentials')
      }

      if (user.password) {
        const correctPwd: Boolean = await bcrypt.compare(
          req.body.password,
          user.password,
        )
        if (correctPwd) {
          const token: any = JwtHandler.createToken({
            user_id: user.id,
            email: user.email,
            remember_me: req.body.remember_me,
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
  
  static requiresAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user: IUser | Error = await UserProvider.findOneByEmail(req.body.email)
      if (user instanceof Error) {
        throw Error('invalid credentials')
      }

      if (user.password) {
        const correctPwd: Boolean = await bcrypt.compare(
          req.body.password,
          user.password,
        )
        if (correctPwd) {
          const token: any = JwtHandler.createToken({
            user_id: user.id,
            email: user.email,
            remember_me: req.body.remember_me,
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
