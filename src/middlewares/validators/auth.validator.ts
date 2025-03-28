import { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { handleReponseError } from '@/handlers/error.handler'
import { AuthDto } from '@/dtos/auth.dto'

export const authValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userAuth = plainToInstance(AuthDto, req.body)

    await validateOrReject(userAuth)

    next()
  } catch (error) {
    handleReponseError(res, error)
  }
}
