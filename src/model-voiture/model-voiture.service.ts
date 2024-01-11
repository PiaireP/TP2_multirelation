import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModelVoiture } from './model-voiture.interface';
import { CreateModelVoitureDto } from 'src/dto/create-model-voiture.dto';
import { UpdateModelVoitureDto } from 'src/dto/update-model-voiture.dto';

@Injectable()
export class ModelVoitureService {
    constructor(@InjectModel('ModelVoiture') private modelVoitureModel: Model<IModelVoiture>) { }

    async createModelVoiture(createModelVoitureDto: CreateModelVoitureDto): Promise<IModelVoiture> {
        const newModelVoiture = await new this.modelVoitureModel(createModelVoitureDto);
        return newModelVoiture.save();
    }

    async updateModelVoiture(modelVoitureId: string, updateModelVoitureDto: UpdateModelVoitureDto): Promise<IModelVoiture> {
        const existingModelVoiture = await this.modelVoitureModel.findByIdAndUpdate(modelVoitureId, updateModelVoitureDto, { new: true });
        if (!existingModelVoiture) {
            throw new NotFoundException(`ModelVoiture #${modelVoitureId} not found`);
        }
        return existingModelVoiture;
    }

    async getAllModelVoitures(): Promise<IModelVoiture[]> {
        const modelVoitureData = await this.modelVoitureModel.find();
        if (!modelVoitureData || modelVoitureData.length == 0) {
            throw new NotFoundException('ModelVoiture data not found!');
        }
        return modelVoitureData;
    }

    async getModelVoiture(modelVoitureId: string): Promise<IModelVoiture> {
        const existingModelVoiture = await this.modelVoitureModel.findById(modelVoitureId).exec();
        if (!existingModelVoiture) {
            throw new NotFoundException(`ModelVoiture #${modelVoitureId} not found`);
        }
        return existingModelVoiture;
    }
    
    async deleteModelVoiture(modelVoitureId: string): Promise<IModelVoiture> {
        const deletedModelVoiture = await this.modelVoitureModel.findByIdAndDelete(modelVoitureId);
        if (!deletedModelVoiture) {
            throw new NotFoundException(`ModelVoiture #${modelVoitureId} not found`);
        }
        return ;
    }
}
