
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Patient extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  identityDocument: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  healthCoverage?: string;

  @Prop()
  healthCoverageNumber?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MedicalRecord' }] })
  medicalRecords: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Appointment' }] })
  appointments: Types.ObjectId[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
