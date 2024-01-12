import { Module, Logger } from '@nestjs/common';
import { MarqueVoitureController } from './marque-voiture.controller';
import { MarqueVoitureService } from './marque-voiture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarqueVoitureSchema } from '../schema/marque-voiture.schema';
import { ModelVoitureSchema } from 'src/schema/model-voiture.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'MarqueVoiture', schema: MarqueVoitureSchema },
      { name: 'ModelVoiture', schema: ModelVoitureSchema }
    ]),
  ],
  controllers: [MarqueVoitureController],
  providers: [MarqueVoitureService, Logger]
})
export class MarqueVoitureModule {}
