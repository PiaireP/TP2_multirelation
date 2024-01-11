import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ModelVoiture } from './model-voiture.schema';

export type MarqueVoitureDocument = HydratedDocument<MarqueVoiture>;

@Schema()
export class MarqueVoiture {
  @Prop()
  name: string;

  @Prop()
  yearCreation: number;

  @Prop()
  country: string;
}

export const MarqueVoitureSchema = SchemaFactory.createForClass(MarqueVoiture);
