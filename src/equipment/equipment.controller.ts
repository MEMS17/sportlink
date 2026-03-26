import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) { }

    @Post()
    create(@Body() dto: CreateEquipmentDto) {
        return this.equipmentService.create(dto);
    }

    @Get()
    findAll(
        @Query('sport') sport?: string,
        @Query('available') available?: string,
        @Query('category') category?: string,
    ) {
        return this.equipmentService.findAll(
            sport,
            available !== undefined ? available === 'true' : undefined,
            category,
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equipmentService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
        return this.equipmentService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equipmentService.remove(id);
    }
}