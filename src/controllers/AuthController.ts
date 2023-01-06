import { Request, Response, NextFunction } from 'express'
import { JwtHandler, ErrorHelper } from '../middlewares'
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt'
import { UserProvider, IUser } from '../database';

interface IBodyProps extends Omit<IUser, 'id'> { }

export class AuthController {
  static register = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<Response> => {
    try {
      const user = await UserProvider.create(req.body)
      if (user) {
        console.log(`user id = ${user.id}`);
        
        const token = JwtHandler.createToken({ user_id: user.id, remember_me: false })

        return res.status(StatusCodes.CREATED).json({ user, token })
      }
      return res.status(StatusCodes.BAD_REQUEST)
    } catch (err) {
      const error = ErrorHelper.handle(err)
      return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
  }

  static login =  async (req: Request, res: Response): Promise<Response> => {
    const { email, password, remember_me } = req.body

    try {
      const user: any = {}
      if (!user) {
        throw Error('invalid credentials')
      }
      if (user.password && user.password.length > 0) {
        const pwd: Boolean = await bcrypt.compare(password, user.password)
        if (pwd) {
          // const token: any = JwtHandler.createToken({
          //   id: user._id,
          //   remember_me,
          // })
          // return res.status(StatusCodes.OK).json({ user, token })
          return res.status(StatusCodes.OK).json({ })
        }
      }
      // failed credentials
      throw Error('invalid credentials')
    } catch (err) {
      const error = ErrorHelper.handle(err)
      return res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
  }
}
