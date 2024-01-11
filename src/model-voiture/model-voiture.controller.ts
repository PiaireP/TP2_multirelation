import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateModelVoitureDto } from 'src/dto/create-model-voiture.dto';
import { UpdateModelVoitureDto } from 'src/dto/update-model-voiture.dto';
import { ModelVoitureService } from './model-voiture.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('model-voiture')
export class ModelVoitureController {
    constructor(private readonly modelVoitureService: ModelVoitureService) { }

    @ApiResponse({ status: 201, description: `Confirme la creation du modele de voiture`})
    @Post()
    async createModelVoiture(@Res() response, @Body() createModelVoiture: CreateModelVoitureDto) {
        try {
            const newModelVoiture = await this.modelVoitureService.createModelVoiture(createModelVoiture);
            return response.status(HttpStatus.CREATED).json({
                message: 'Model Voiture has been created successfully',
                newModelVoiture,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Model Voiture not created!',
                error: 'Bad Request'
            });
        }
    }

    @ApiResponse({ status: 200, description: `Confirme la modification du modele de voiture`})
    @Put('/:id')
    async updateModelVoiture(@Res() response, @Param('id') modelVoitureId: string,
        @Body() UpdateModelVoitureDto: UpdateModelVoitureDto) {
        try {
            const existingModelVoiture = await this.modelVoitureService.updateModelVoiture(modelVoitureId, UpdateModelVoitureDto);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture has been successfully updated',
                existingModelVoiture,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne tous les modeles de voiture`})
    @Get()
    async getModelVoitures(@Res() response) {
        try {
            const modelVoitureData = await this.modelVoitureService.getAllModelVoitures();
            return response.status(HttpStatus.OK).json({
                message: 'All model voiture data found successfully', modelVoitureData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne le modeles de voiture demander`})
    @Get('/:id')
    async getModelVoiture(@Res() response, @Param('id') modelVoitureId: string) {
        try {
            const existingModelVoiture = await
                this.modelVoitureService.getModelVoiture(modelVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture found successfully', existingModelVoiture,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Supprime le modeles de voiture demander`})
    @Delete('/:id')
    async deleteModelVoiture(@Res() response, @Param('id') modelVoitureId: string) {
        try {
            const deletedModelVoiture = await this.modelVoitureService.deleteModelVoiture(modelVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture deleted successfully',
                deletedModelVoiture,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}