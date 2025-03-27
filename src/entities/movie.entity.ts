import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { MovieGender } from '@/types/movie'
import { ShowTime } from './show-time.entity'

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  posterImage: string

  @Column({
    type: 'enum',
    enum: MovieGender,
    nullable: false,
  })
  gender: MovieGender

  @Column()
  duration: number

  @Column('date')
  releaseDate: Date

  @OneToMany(() => ShowTime, showTime => showTime.movie)
  showTimes: Relation<ShowTime[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
