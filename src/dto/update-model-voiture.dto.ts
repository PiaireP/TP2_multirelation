import { PartialType } from '@nestjs/swagger';
import { CreateModelVoitureDto } from './create-model-voiture.dto';

export class UpdateModelVoitureDto extends PartialType(CreateModelVoitureDto) {}
