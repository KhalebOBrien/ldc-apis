import * as jwt from 'jsonwebtoken'

interface IJwtData {
  user_id: number
  remember_me: boolean
}

export class JwtHandler {
  static createToken = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
    const secret = process.env.JWT_SECRET
    if (!secret) return 'JWT_SECRET_NOT_FOUND'

    let maxAge = 15 * 24 * 60 * 60 // 15 day
    if (data.remember_me && data.remember_me === true) {
      maxAge = 30 * 24 * 60 * 60 // 30 day
      return jwt.sign({ data }, secret, { expiresIn: maxAge })
    }
    return jwt.sign({ data }, secret, { expiresIn: maxAge })
  }

  static verifyToken = (
    token: string,
  ): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    const secret = process.env.JWT_SECRET
    if (!secret) return 'JWT_SECRET_NOT_FOUND'

    try {
      const decoded = jwt.verify(token, secret)
      if (typeof decoded === 'string') {
        return 'INVALID_TOKEN'
      }

      return decoded as IJwtData
    } catch (error) {
      return 'INVALID_TOKEN'
    }
  }
}
