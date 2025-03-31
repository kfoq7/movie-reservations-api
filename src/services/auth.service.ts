import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'
import { Token } from '@/config/token.config'
import { AuthDto } from '@/dtos/auth.dto'

export class AuthService {
  private readonly userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async register(data: AuthDto) {
    const { password, ...restUser } = data

    const hasedPassword = await bcrypt.hash(password, 5)

    const user = this.userRepository.createUser({
      ...restUser,
      password: hasedPassword,
    })

    return user
  }

  async login(data: AuthDto) {
    const { password, email } = data

    const user = await this.userRepository.findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new Error('User not found')

    const payload = {
      userId: user.id,
    }

    const token = await Token.generate(payload)

    return {
      ...user,
      token,
    }
  }
}
