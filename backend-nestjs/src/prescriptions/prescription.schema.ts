import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema({ timestamps: true })
export class Prescription {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  doctor: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  patient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MedicalHistory' })
  medicalHistory: Types.ObjectId;

  @Prop({ required: true }) medication: string;
  @Prop() dosage: string;
  @Prop() instructions: string;
  @Prop({ default: false }) digitallySigned: boolean;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
