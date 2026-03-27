import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Post()
    create(
        @CurrentUser() user: { userId: string; email: string; role: string },
        @Body() dto: CreateReservationDto,
    ) {
        return this.reservationsService.create(user.userId, dto);
    }

    @Get('me')
    findMine(
        @CurrentUser() user: { userId: string; email: string; role: string },
    ) {
        return this.reservationsService.findMine(user.userId);
    }

    @Patch(':id/return')
    returnReservation(
        @CurrentUser() user: { userId: string; email: string; role: string },
        @Param('id') id: string,
    ) {
        return this.reservationsService.returnReservation(user.userId, id);
    }

    @Get()
    findAll() {
        return this.reservationsService.findAll();
    }
}