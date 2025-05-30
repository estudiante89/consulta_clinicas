import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MedicalHistoryDocument = MedicalHistory & Document;

@Schema({ timestamps: true })
export class MedicalHistory {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  patient: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  doctor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Appointment' })
  appointment: Types.ObjectId;

  @Prop({ required: true }) diagnosis: string;
  @Prop() observations?: string;
  @Prop() tests?: string;
  @Prop() treatment?: string;
}

export const MedicalHistorySchema = SchemaFactory.createForClass(MedicalHistory);
