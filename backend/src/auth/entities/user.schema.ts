
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['patient', 'professional', 'staff', 'admin'], required: true })
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: false })
  patient?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Professional', required: false })
  professional?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'StaffMember', required: false })
  staffMember?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
