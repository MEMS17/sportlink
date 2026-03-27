import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument, ReservationStatus } from '../schemas/reservation.schema';
import { Equipment, EquipmentDocument } from '../schemas/equipment.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectModel(Reservation.name)
        private readonly reservationModel: Model<ReservationDocument>,
        @InjectModel(Equipment.name)
        private readonly equipmentModel: Model<EquipmentDocument>,
    ) { }

    async create(userId: string, dto: CreateReservationDto): Promise<ReservationDocument> {
        const equipment = await this.equipmentModel.findById(dto.equipmentId).exec();

        if (!equipment) {
            throw new NotFoundException(`Equipment #${dto.equipmentId} not found`);
        }

        if (equipment.quantity <= 0 || equipment.available === false) {
            throw new ForbiddenException('Equipment is not available');
        }

        equipment.quantity -= 1;
        equipment.available = equipment.quantity > 0;
        await equipment.save();

        const reservation = new this.reservationModel({
            userId: new Types.ObjectId(userId),
            equipmentId: new Types.ObjectId(dto.equipmentId),
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
            status: ReservationStatus.ACTIVE,
        });

        return reservation.save();
    }

    async findMine(userId: string): Promise<ReservationDocument[]> {
        return this.reservationModel
            .find({ userId: new Types.ObjectId(userId) })
            .populate('equipmentId')
            .sort({ createdAt: -1 })
            .exec();
    }

    async returnReservation(userId: string, reservationId: string): Promise<ReservationDocument> {
        const reservation = await this.reservationModel.findById(reservationId).exec();

        if (!reservation) {
            throw new NotFoundException(`Reservation #${reservationId} not found`);
        }

        if (reservation.userId.toString() !== userId) {
            throw new ForbiddenException('You cannot return this reservation');
        }

        if (reservation.status === ReservationStatus.RETURNED) {
            throw new ForbiddenException('Reservation already returned');
        }

        const equipment = await this.equipmentModel.findById(reservation.equipmentId).exec();

        if (!equipment) {
            throw new NotFoundException(
                `Equipment #${reservation.equipmentId.toString()} not found`,
            );
        }

        equipment.quantity += 1;
        equipment.available = equipment.quantity > 0;
        await equipment.save();

        reservation.status = ReservationStatus.RETURNED;
        await reservation.save();

        return reservation;
    }

    async findAll(): Promise<ReservationDocument[]> {
        return this.reservationModel
            .find()
            .populate('userId', '-password')
            .populate('equipmentId')
            .sort({ createdAt: -1 })
            .exec();
    }
}