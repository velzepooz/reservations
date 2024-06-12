import {
  Check,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Amenity } from '../amenity/amenity.entity';

@Entity()
@Check(`"startTime" >= 0`)
@Check(`"startTime" < 1440`)
@Check(`"endTime" >= 0`)
@Check(`"endTime" < 1440`)
@Check(`"endTime" > "startTime"`)
@Check(`"date" >= 0`)
@Index('idx_date', ['date'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  amenityId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  startTime: number;

  @Column({ type: 'int', nullable: false })
  endTime: number;

  @Column({ type: 'bigint', nullable: false })
  date: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Amenity, (amenity) => amenity.reservations)
  amenity: Amenity;
}
