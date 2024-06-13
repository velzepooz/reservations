import { Controller, Get, HttpStatus, Param, UsePipes } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AmenityReservationDto } from './dto/out/amenity-reservation.dto';
import { GetByAmenityQueryDto } from './dto/in/get-by-amenity-query.dto';
import { ParamValidationPipe } from '../../app/pipes/param-validation.pipe';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiResponse({ status: HttpStatus.OK, type: [AmenityReservationDto] })
  @UsePipes(new ParamValidationPipe())
  @Get('/amenity/:id/:reservationDate')
  async getByAmenity(
    @Param() { id, reservationDate }: GetByAmenityQueryDto,
  ): Promise<AmenityReservationDto[]> {
    return this.reservationService.getByAmenity(id, reservationDate);
  }
}
