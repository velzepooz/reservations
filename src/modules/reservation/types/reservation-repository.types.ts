import { User } from '../../user/user.entity';
import { Amenity } from '../../amenity/amenity.entity';

export type IReservation = {
  id: number;
  amenityId: number;
  userId: number;
  startTime: number;
  endTime: number;
  date: number;
  user?: User;
  amenity?: Amenity;
};
