import { Router } from 'express'
import { login, register } from '@/controllers/user.controller'
import { AuthDto } from '@/dtos/auth.dto'
import { validate } from '@/middlewares/validators'

const router = Router()

router.post('/login', validate(AuthDto), login)

router.post('/register', validate(AuthDto), register)

export { router }
