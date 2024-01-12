import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelVoitureController } from './model-voiture.controller';
import { ModelVoitureService } from './model-voiture.service';
import { ModelVoitureSchema } from 'src/schema/model-voiture.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'ModelVoiture', schema: ModelVoitureSchema }])],
  controllers: [ModelVoitureController],
  providers: [ModelVoitureService, Logger]
})
export class ModelVoitureModule {}
