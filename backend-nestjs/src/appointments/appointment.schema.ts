import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  patient: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  doctor: Types.ObjectId;

  @Prop({ required: true }) date: Date;
  @Prop({ required: true }) modality: 'presencial' | 'remota';
  @Prop() reason?: string;
  @Prop({ default: 'pendiente' }) status: 'pendiente' | 'completada' | 'cancelada';
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
