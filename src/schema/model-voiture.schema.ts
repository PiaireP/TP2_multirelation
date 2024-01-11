import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MarqueVoiture } from './marque-voiture.schema';

export type ModelVoitureDocument = HydratedDocument<ModelVoiture>;

@Schema()
export class ModelVoiture {
  @Prop()
  name: string;

  @Prop()
  yearCreation: number;

  @Prop()
  nbPorte: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'MarqueVoiture' })
  marqueVoiture: MarqueVoiture;
}

export const ModelVoitureSchema = SchemaFactory.createForClass(ModelVoiture);
