import { Request, Response } from 'express'
import { handleReponseError } from '@/handlers/error.handler'
import { AuthService } from '@/services/auth.service'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body)

    res.status(201).json({
      ...user,
    })
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body)

    res.status(200).json({
      ...user,
    })
  } catch (error) {
    handleReponseError(res, error)
  }
}
