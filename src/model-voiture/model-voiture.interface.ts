import { Document } from 'mongoose';
import { IMarqueVoiture } from 'src/marque-voiture/marque-voiture.interface';

export interface IModelVoiture extends Document{
    readonly name: string;
    readonly yearCreation: number;
    readonly nbPorte: number;
    readonly marqueVoiture: IMarqueVoiture
}
