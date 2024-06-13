import { Controller, Get, HttpStatus, Param, UsePipes } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AmenityReservationDto } from './dto/out/amenity-reservation.dto';
import { GetByAmenityQueryDto } from './dto/in/get-by-amenity-query.dto';
import { ParamValidationPipe } from '../../app/pipes/param-validation.pipe';
import { RESERVATION_HTTP_ROUTES } from './constants/reservation-http-routes.constant';

@ApiTags('Reservations')
@Controller(RESERVATION_HTTP_ROUTES.MAIN)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiResponse({ status: HttpStatus.OK, type: [AmenityReservationDto] })
  @UsePipes(new ParamValidationPipe())
  @Get(`${RESERVATION_HTTP_ROUTES.GET_BY_AMENITY}/:amenityId/:reservationDate`)
  async getByAmenity(
    @Param() { amenityId, reservationDate }: GetByAmenityQueryDto,
  ): Promise<AmenityReservationDto[]> {
    return this.reservationService.getByAmenity(amenityId, reservationDate);
  }
}
