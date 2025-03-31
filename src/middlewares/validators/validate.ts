import { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { handleReponseError } from '@/handlers/error.handler'
import { ClassType } from '@/types'

export const validate = (ClassDto: ClassType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectInstance = plainToInstance(ClassDto, req.body)

      await validateOrReject(objectInstance)

      req.body = objectInstance

      next()
    } catch (error) {
      handleReponseError(res, error)
    }
  }
}
