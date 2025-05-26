
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicoDocument = Medico & Document;

@Schema()
export class Medico {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  especialidad: string;

  @Prop()
  telefono: string;

  @Prop({ unique: true, required: true })
  email: string;
}

export const MedicoSchema = SchemaFactory.createForClass(Medico);
