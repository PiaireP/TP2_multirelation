import { IsNotEmpty, IsNumber, IsString, MaxLength, ValidateNested, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarqueVoitureDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @ApiProperty({
        description: "Nom de la marque",
    })
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: "Année de création de la marque",
    })
    readonly yearCreation: number;
    
    @IsString()
    @MaxLength(60)
    @IsNotEmpty()
    @ApiProperty({
        description: "Pays d'origine de la marque",
    })
    readonly country: string;
}