
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  duration: number; // in minutes

  @Prop({ enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' })
  status: string;

  @Prop({ enum: ['in-person', 'remote'], required: true })
  type: string;

  @Prop()
  reason?: string;

  @Prop()
  notes?: string;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Professional', required: true })
  professional: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true })
  clinic: Types.ObjectId;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
