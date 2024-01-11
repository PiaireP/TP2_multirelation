import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateMarqueVoitureDto } from "./create-marque-voiture.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateModelVoitureDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @ApiProperty({
        description: "Nom du modele",
    })
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Anne de creation du modele",
    })
    readonly yearCreation: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Nombre de porte du modele",
    })
    readonly nbPorte: number;

    @Type(() => CreateMarqueVoitureDto)
    @ApiProperty({
        description: "Id de la marque du modele du modele",
    })
    readonly marqueVoiture: CreateMarqueVoitureDto;
}