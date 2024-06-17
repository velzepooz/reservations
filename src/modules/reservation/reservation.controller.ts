import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AmenityReservationDto } from './dto/out/amenity-reservation.dto';
import { GetByAmenityQueryDto } from './dto/in/get-by-amenity-query.dto';
import { ParamValidationPipe } from '../../app/pipes/param-validation.pipe';
import { RESERVATION_HTTP_ROUTES } from './constants/reservation-http-routes.constant';
import { GetByUserParamsDto } from './dto/in/get-by-user-params.dto';
import { UserReservationDto } from './dto/out/user-reservation.dto';

@ApiTags('Reservations')
@Controller(RESERVATION_HTTP_ROUTES.MAIN)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOkResponse({ type: [AmenityReservationDto] })
  @ApiBadRequestResponse({ description: 'Invalid route params' })
  @UsePipes(new ParamValidationPipe())
  @Get(`${RESERVATION_HTTP_ROUTES.AMENITY}/:amenityId/:reservationDate`)
  async getByAmenity(
    @Param() { amenityId, reservationDate }: GetByAmenityQueryDto,
  ): Promise<AmenityReservationDto[]> {
    return this.reservationService.getByAmenity(amenityId, reservationDate);
  }

  @ApiOkResponse({ type: [UserReservationDto] })
  @ApiBadRequestResponse({ description: 'Invalid route params' })
  @UsePipes(new ParamValidationPipe())
  @Get(`${RESERVATION_HTTP_ROUTES.USER}/:userId`)
  async getByUser(
    @Param() { userId }: GetByUserParamsDto,
  ): Promise<UserReservationDto[]> {
    return this.reservationService.getByUser(userId);
  }
}
