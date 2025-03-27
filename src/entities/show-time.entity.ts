import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { Movie } from './movie.entity'

@Entity()
export class ShowTime {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  startTime: number

  @Column()
  endTime: number

  @Column()
  availableSeats: number

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to(value) {
        return value
      },
      from(value) {
        return parseFloat(value)
      },
    },
  })
  price: number

  @ManyToOne(() => Movie, movie => movie.showTimes)
  movie: Relation<Movie>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
