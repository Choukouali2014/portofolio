import {ESkills} from './ESkills';
import { IEducation } from '../education/IEducation'
import { IExperience } from '../experience/IExperience';
export interface IEmployees {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
    state: string;
    email: string;
    phone?: number;
    contactPreference: string;
    skills: ESkills[];
    education: IEducation[];
    experience: IExperience[];
    uid?: string;
}
