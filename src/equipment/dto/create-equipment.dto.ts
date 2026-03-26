import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    sport: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsBoolean()
    available: boolean;
}