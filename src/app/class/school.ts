import { SchoolProfessional } from './schoolProfessional';
import { Professional } from './professional';

export class School {
  id: number;
  name: string;
  province: string;
  schoolProfessionals: SchoolProfessional[];
  professionals: Professional[];
}

