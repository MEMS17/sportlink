import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

export enum ReservationStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    RETURNED = 'RETURNED',
}

@Schema({ timestamps: true })
export class Reservation {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId!: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Equipment' })
    equipmentId!: Types.ObjectId;

    @Prop({ required: true })
    startDate!: Date;

    @Prop({ required: true })
    endDate!: Date;

    @Prop({
        required: true,
        enum: ReservationStatus,
        default: ReservationStatus.ACTIVE,
    })
    status!: ReservationStatus;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);