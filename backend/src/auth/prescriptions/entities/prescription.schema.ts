
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Prescription extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  medication: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  frequency: string;

  @Prop()
  instructions?: string;

  @Prop()
  validUntil?: Date;

  @Prop({ default: false })
  isDigital: boolean;

  @Prop()
  digitalSignature?: string;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Professional', required: true })
  professional: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MedicalRecord' })
  medicalRecord?: Types.ObjectId;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
