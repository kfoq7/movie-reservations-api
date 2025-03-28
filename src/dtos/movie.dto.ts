import { IsDate, IsNotEmpty, IsString, Matches } from 'class-validator'
import { Transform } from 'class-transformer'
import { MovieGender } from '@/types/movie'

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @Matches(
    `^${Object.values(MovieGender)
      .filter(value => typeof value !== 'number')
      .join('|')}$`,
    'i',
  )
  gender: MovieGender

  @IsString()
  @IsNotEmpty()
  duration: string

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  realseDate: Date
}
