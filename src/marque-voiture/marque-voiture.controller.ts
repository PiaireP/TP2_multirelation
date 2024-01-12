import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res, Logger } from '@nestjs/common';
import { CreateMarqueVoitureDto } from 'src/dto/create-marque-voiture.dto';
import { UpdateMarqueVoitureDto } from 'src/dto/update-marque-voiture.dto';
import { MarqueVoitureService } from './marque-voiture.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('marque-voiture')
export class MarqueVoitureController {
    constructor(private readonly voitureMarqueService: MarqueVoitureService,
        private readonly logger: Logger) { }
    

    @Post()
    @ApiResponse({ status: 201, description: `Retourne la confirmation de la creation de la marque plus l'objet crée`})
    @ApiResponse({ status: 400, description: `Retourne le fait que la marque n'as pas était crée`})
    async createVoitureMarque(@Res() response, @Body() createMarqueVoitureDto: CreateMarqueVoitureDto) {
        this.logger.log('Call createVoitureMarque', MarqueVoitureController.name);
        try {
            const newVoitureMarque = await this.voitureMarqueService.createMarqueVoiture(createMarqueVoitureDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Marque Voiture has been created successfully',
                newVoitureMarque,
            });
        } catch (err) {
            this.logger.error('Call createVoitureMarque', err.stack, MarqueVoitureController.name);
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Marque Voiture not created!',
                error: 'Bad Request' 
            });
        }
    }

    @ApiResponse({ status: 200, description: `Retourne la confirmation de la modification de la marque plus l'objet modifié`})
    @ApiResponse({ status: 400, description: `Retourne le fait que la marque n'as pas était modifié`})
    @Put('/:id')
    async updateVoitureMarque(@Res() response, @Param('id') marqueVoitureId: string,
        @Body() updateVoitureMarqueDto: UpdateMarqueVoitureDto) {
            this.logger.log('Call updateVoitureMarque', MarqueVoitureController.name);
        try {
            const existingMarqueVoiture = await this.voitureMarqueService.updateMarqueVoiture(marqueVoitureId, updateVoitureMarqueDto);
            return response.status(HttpStatus.OK).json({
                message: 'Marque Voiture has been successfully updated',
                existingMarqueVoiture,
            });
        } catch (err) {
            this.logger.error('Call updateVoitureMarque', err.stack, MarqueVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne toute les marques de voiture`})
    @Get()
    async getMarqueVoitures(@Res() response) {
        this.logger.log('Call getMarqueVoitures', MarqueVoitureController.name);
        try {
            const marqueVoitureData = await this.voitureMarqueService.getAllMarqueVoitures();
            return response.status(HttpStatus.OK).json({
                message: 'All students data found successfully', marqueVoitureData,
            });
        } catch (err) {
            this.logger.error('Call getMarqueVoitures', MarqueVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne la marque de voiture demander`})
    @Get('/:id')
    async getMarqueVoiture(@Res() response, @Param('id') marqueVoitureId: string) {
        this.logger.log('Call getMarqueVoiture', MarqueVoitureController.name);
        try {
            const existingMarqueVoiture = await
                this.voitureMarqueService.getMarqueVoiture(marqueVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Marque Voiture found successfully', existingMarqueVoiture,
            });
        } catch (err) {
            this.logger.error('Call getMarqueVoiture', err.stack, MarqueVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Retourne tous les modeles de la marque de voiture demander`})
    @Get('/:id/modeles')
    async getModelVoituresByMarque(@Res() response, @Param('id') marqueVoitureId: string) {
        this.logger.log('Call getModelVoituresByMarque', MarqueVoitureController.name);
        try {
            const modeles = await this.voitureMarqueService.getModelVoituresByMarque(marqueVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Modèles trouvés avec succès', modeles,
            });
        } catch (err) {
            this.logger.error('Call getModelVoituresByMarque', MarqueVoitureController.name);
            return response.status(err.status).json(err.response);
        }
    }

    @ApiResponse({ status: 200, description: `Confirme la suppression de la marque de voiture et de tous les modeles lier`})
    @Delete('/:id')
    async deleteMarqueVoiture(@Res() response, @Param('id') marqueVoitureId: string) {
        this.logger.log('Call deleteMarqueVoiture', MarqueVoitureController.name);
        try {
            const deletedMarqueVoiture = await this.voitureMarqueService.deleteMarqueVoiture(marqueVoitureId);
            return response.status(HttpStatus.OK).json({
                message: 'Marque Voiture et ses modèles supprimés', deletedMarqueVoiture
            });
        } catch (err) {
            this.logger.error('Call deleteMarqueVoiture', MarqueVoitureController.name);
            return response.status(err.status).json(err.response); 
        }
        // try {
        //     const deletedMarqueVoiture = await this.voitureMarqueService.deleteMarqueVoiture(marqueVoitureId);
        //     return response.status(HttpStatus.OK).json({
        //         message: 'Marque Voiture deleted successfully',
        //         deletedMarqueVoiture,
        //     });
        // } catch (err) {
        //     return response.status(err.status).json(err.response);
        // }
    }
}

