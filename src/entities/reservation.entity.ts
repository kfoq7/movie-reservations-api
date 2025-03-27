import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { User } from './user.entity'
import { ShowTime } from './show-time.entity'

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  seatNumbers: number

  @Column()
  reservationTime: number

  @ManyToOne(() => User, user => user.reservations)
  @JoinColumn()
  user: Relation<User>

  @ManyToOne(() => ShowTime)
  @JoinColumn()
  showTime: Relation<ShowTime>
}
