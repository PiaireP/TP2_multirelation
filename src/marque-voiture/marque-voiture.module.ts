import { Module } from '@nestjs/common';
import { MarqueVoitureController } from './marque-voiture.controller';
import { MarqueVoitureService } from './marque-voiture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarqueVoitureSchema } from '../schema/marque-voiture.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'MarqueVoiture', schema: MarqueVoitureSchema }])],
  controllers: [MarqueVoitureController],
  providers: [MarqueVoitureService]
})
export class MarqueVoitureModule {}
