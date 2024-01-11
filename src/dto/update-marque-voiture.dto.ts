import { PartialType } from '@nestjs/swagger';
import { CreateMarqueVoitureDto } from './create-marque-voiture.dto';

export class UpdateMarqueVoitureDto extends PartialType(CreateMarqueVoitureDto) {}
