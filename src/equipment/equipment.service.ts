import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipment, EquipmentDocument } from '../schemas/equipment.schema';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
    constructor(
        @InjectModel(Equipment.name)
        private readonly equipmentModel: Model<EquipmentDocument>,
    ) { }

    async create(dto: CreateEquipmentDto): Promise<EquipmentDocument> {
        const equipment = new this.equipmentModel(dto);
        return equipment.save();
    }

    async findAll(
        sport?: string,
        available?: boolean,
        category?: string,
    ): Promise<EquipmentDocument[]> {
        const filter: Record<string, unknown> = {};

        if (sport) {
            filter.sport = { $regex: sport, $options: 'i' };
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        if (available !== undefined) {
            filter.available = available;
        }

        return this.equipmentModel.find(filter).exec();
    }

    async findOne(id: string): Promise<EquipmentDocument> {
        const equipment = await this.equipmentModel.findById(id).exec();

        if (!equipment) {
            throw new NotFoundException(`Equipment #${id} not found`);
        }

        return equipment;
    }

    async update(
        id: string,
        dto: UpdateEquipmentDto,
    ): Promise<EquipmentDocument> {
        const updated = await this.equipmentModel
            .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .exec();

        if (!updated) {
            throw new NotFoundException(`Equipment #${id} not found`);
        }

        return updated;
    }

    async remove(id: string): Promise<void> {
        const deleted = await this.equipmentModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException(`Equipment #${id} not found`);
        }
    }
}