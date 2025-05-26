
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Professional extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true, unique: true })
  licenseNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Appointment' }] })
  appointments: Types.ObjectId[];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
