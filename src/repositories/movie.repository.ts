import { Repository } from 'typeorm'
import { AppDataSource } from '@/config/database'
import { Movie } from '@/entities/movie.entity'

export class MovieRepository {
  private readonly movieRepositry: Repository<Movie>

  constructor() {
    this.movieRepositry = AppDataSource.getRepository(Movie)
  }

  async createMovie(data: Movie) {
    const newMovie = this.movieRepositry.create(data)
    const savedMovie = await this.movieRepositry.save(newMovie)

    return savedMovie
  }
}
