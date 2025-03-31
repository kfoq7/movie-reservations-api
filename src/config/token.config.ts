import jwt from 'jsonwebtoken'
import { authEnvConfig } from './env.config'
import type { Payload } from '@/types/auth'

export class Token {
  private static JWT_SEED = authEnvConfig.jwtSecret

  public static generate(payload: Payload): Promise<string | null> {
    return new Promise(resolve => {
      jwt.sign(payload, this.JWT_SEED, { expiresIn: '1h' }, (error, token) => {
        if (error || !token) return resolve(null)

        resolve(token)
      })
    })
  }

  public static validate(token: string): Promise<Payload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.JWT_SEED, (error, decoded) => {
        if (!error) return resolve(decoded as Payload)

        error.message = 'Cannot validated token'

        if (error.message === 'invalid signature')
          error.message = 'Invalid token'

        if (error.message === 'jwt expired') error.message = 'Token expired'

        return reject(error)
      })
    })
  }
}
