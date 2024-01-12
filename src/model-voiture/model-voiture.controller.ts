import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Logger } from '@nestjs/common';
import { CreateModelVoitureDto } from 'src/dto/create-model-voiture.dto';
import { UpdateModelVoitureDto } from 'src/dto/update-model-voiture.dto';
import { ModelVoitureService } from './model-voiture.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('model-voiture')
export class ModelVoitureController {
    constructor(private readonly modelVoitureService: ModelVoitureService,
        private readonly logger: Logger) { }

    @ApiResponse({ status: 201, description: `Confirme la creation du modele de voiture`})
    @Post()
    async createModelVoiture(@Res() response, @Body() createModelVoiture: CreateModelVoitureDto) {
        this.logger.log('Call createModelVoiture', ModelVoitureController.name);
        try {
            const newModelVoiture = await this.modelVoitureService.createModelVoiture(createModelVoiture);
            return response.status(HttpStatus.CREATED).json({
                message: 'Model Voiture has been created successfully',
                newModelVoiture,
            });
        } catch (err) {
            this.logger.error('Call createModelVoiture', ModelVoitureController.name);
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
            this.logger.log('Call updateModelVoiture', ModelVoitureController.name);
        try {
            const existingModelVoiture = await this.modelVoitureService.updateModelVoiture(modelVoitureId, UpdateModelVoitureDto);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture has been successfully updated',
                existingModelVoiture,
            });
        } catch (err) {
            this.logger.error('Call updateModelVoiture', ModelVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne tous les modeles de voiture`})
    @Get()
    async getModelVoitures(@Res() response) {
        this.logger.log('Call getModelVoitures', ModelVoitureController.name);
        try {
            const modelVoitureData = await this.modelVoitureService.getAllModelVoitures();
            return response.status(HttpStatus.OK).json({
                message: 'All model voiture data found successfully', modelVoitureData,
            });
        } catch (err) {
            this.logger.error('Call getModelVoitures', ModelVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne le modeles de voiture demander`})
    @Get('/:id')
    async getModelVoiture(@Res() response, @Param('id') modelVoitureId: string) {
        this.logger.log('Call getModelVoiture', ModelVoitureController.name);
        try {
            const existingModelVoiture = await
                this.modelVoitureService.getModelVoiture(modelVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture found successfully', existingModelVoiture,
            });
        } catch (err) {
            this.logger.error('Call getModelVoiture', ModelVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Supprime le modeles de voiture demander`})
    @Delete('/:id')
    async deleteModelVoiture(@Res() response, @Param('id') modelVoitureId: string) {
        this.logger.log('Call deleteModelVoiture', ModelVoitureController.name);
        try {
            const deletedModelVoiture = await this.modelVoitureService.deleteModelVoiture(modelVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Model Voiture deleted successfully',
                deletedModelVoiture,
            });
        } catch (err) {
            this.logger.error('Call deleteModelVoiture', ModelVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }
}