
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StaffMember extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const StaffMemberSchema = SchemaFactory.createForClass(StaffMember);
