import { Repository } from 'typeorm'
import { AppDataSource } from '@/config/database'
import { User } from '@/entities/user.entity'
import { AuthDto } from '@/dtos/auth.dto'

export class UserRepository {
  private readonly userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  async createUser(data: AuthDto) {
    const newUser = this.userRepository.create(data)
    const savedUser = await this.userRepository.save(newUser)

    return savedUser
  }
}
