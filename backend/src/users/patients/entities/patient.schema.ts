
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  edad: number;

  @Prop({ required: true })
  sexo: string;

  @Prop()
  direccion: string;

  @Prop()
  telefono: string;

  @Prop({ unique: true, required: true })
  email: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
