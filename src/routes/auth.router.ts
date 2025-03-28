import { Router } from 'express'
import { login, register } from '@/controllers/user.controller'
import { authValidator } from '@/middlewares/validators'

const router = Router()

router.post('/login', authValidator, login)

router.post('/register', authValidator, register)

export { router }
