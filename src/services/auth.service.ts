import bcrypt from 'bcrypt'
import { UserRepository } from '../repositories/user.repository'
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
    if (!user) throw new Error('User not found')

    const isHasedPassword = await bcrypt.compare(password, user.password)
    if (!isHasedPassword) throw new Error('Wrong password')

    return user
  }
}
