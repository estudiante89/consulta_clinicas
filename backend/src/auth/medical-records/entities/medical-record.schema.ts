
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class MedicalRecord extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  diagnosis: string;

  @Prop()
  observations?: string;

  @Prop()
  treatment?: string;

  @Prop([String])
  tests?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Professional', required: true })
  professional: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Appointment' })
  appointment?: Types.ObjectId;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
