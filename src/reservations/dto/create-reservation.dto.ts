import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
    @IsMongoId()
    @IsNotEmpty()
    equipmentId!: string;

    @IsDateString()
    startDate!: string;

    @IsDateString()
    endDate!: string;
}